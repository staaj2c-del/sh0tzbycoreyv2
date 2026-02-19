import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Camera, 
  LogOut, 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit2, 
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useBookings } from '@/hooks/useBookings';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import type { Booking } from '@/types/booking';
import { SERVICES, TIME_SLOTS } from '@/types/booking';
import { format, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const STATUS_COLORS = {
  pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  confirmed: 'bg-green-500/20 text-green-500 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-500 border-red-500/30',
  completed: 'bg-blue-500/20 text-blue-500 border-blue-500/30'
};

export function AdminDashboard() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { bookings, updateBooking, deleteBooking, addBooking } = useBookings();
  const { 
    isSignedIn, 
    isLoading: calendarLoading, 
    signIn, 
    signOut, 
    addEventToCalendar,
    deleteCalendarEvent 
  } = useGoogleCalendar();
  
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Booking>>({});
  const [newBookingData, setNewBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    notes: '',
    status: 'pending' as const
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Protect admin route
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, authLoading, navigate]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (booking: Booking, newStatus: Booking['status']) => {
    updateBooking(booking.id, { status: newStatus });
    toast.success(`Booking status updated to ${newStatus}`);
  };

  const handleDelete = async () => {
    if (!selectedBooking) return;
    
    // Delete from Google Calendar if connected
    if (isSignedIn && selectedBooking.googleCalendarEventId) {
      await deleteCalendarEvent(selectedBooking.googleCalendarEventId);
    }
    
    deleteBooking(selectedBooking.id);
    setIsDeleteDialogOpen(false);
    setSelectedBooking(null);
    toast.success('Booking deleted successfully');
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditFormData(booking);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedBooking || !editFormData) return;
    
    updateBooking(selectedBooking.id, editFormData);
    setIsEditDialogOpen(false);
    setSelectedBooking(null);
    toast.success('Booking updated successfully');
  };

  const handleAddToCalendar = async (booking: Booking) => {
    if (!isSignedIn) {
      toast.error('Please connect to Google Calendar first');
      return;
    }
    
    const eventId = await addEventToCalendar(booking);
    if (eventId) {
      updateBooking(booking.id, { googleCalendarEventId: eventId });
      toast.success('Added to Google Calendar!');
    }
  };

  const handleAddBooking = () => {
    if (!newBookingData.name || !newBookingData.email || !newBookingData.date || !newBookingData.time || !newBookingData.service) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const booking = addBooking(newBookingData);
    
    if (isSignedIn) {
      addEventToCalendar(booking).then(eventId => {
        if (eventId) {
          updateBooking(booking.id, { googleCalendarEventId: eventId });
        }
      });
    }
    
    setIsAddDialogOpen(false);
    setNewBookingData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      service: '',
      notes: '',
      status: 'pending'
    });
    setSelectedDate(undefined);
    toast.success('New booking added successfully');
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-xs text-zinc-500">Shotz by Corey</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Google Calendar Status */}
              <Button
                variant="outline"
                size="sm"
                onClick={isSignedIn ? signOut : signIn}
                className={cn(
                  "border-zinc-700",
                  isSignedIn 
                    ? "text-green-500 hover:text-green-400 hover:bg-green-500/10" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                )}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {calendarLoading ? 'Connecting...' : isSignedIn ? 'Calendar Connected' : 'Connect Calendar'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4">
              <p className="text-zinc-500 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4">
              <p className="text-zinc-500 text-sm">Pending</p>
              <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4">
              <p className="text-zinc-500 text-sm">Confirmed</p>
              <p className="text-3xl font-bold text-green-500">{stats.confirmed}</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4">
              <p className="text-zinc-500 text-sm">Completed</p>
              <p className="text-3xl font-bold text-blue-500">{stats.completed}</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-zinc-900 border-zinc-800 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="all" className="text-white">All Status</SelectItem>
              <SelectItem value="pending" className="text-white">Pending</SelectItem>
              <SelectItem value="confirmed" className="text-white">Confirmed</SelectItem>
              <SelectItem value="cancelled" className="text-white">Cancelled</SelectItem>
              <SelectItem value="completed" className="text-white">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Booking
          </Button>
        </div>

        {/* Bookings List */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="bg-zinc-900 border-zinc-800 mb-6">
            <TabsTrigger value="list" className="data-[state=active]:bg-zinc-800 text-white">List View</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-zinc-800 text-white">Calendar View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            {filteredBookings.length === 0 ? (
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="py-12 text-center">
                  <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">No bookings found</p>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Booking Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{booking.name}</h3>
                          <Badge variant="outline" className={STATUS_COLORS[booking.status]}>
                            {booking.status}
                          </Badge>
                          {booking.googleCalendarEventId && (
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                              <Calendar className="w-3 h-3 mr-1" />
                              Calendar
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-zinc-400">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-amber-500" />
                            {booking.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-amber-500" />
                            {booking.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            {format(parseISO(booking.date), 'MMM d, yyyy')}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            {booking.time}
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <span className="text-amber-500 font-medium">{booking.service}</span>
                          {booking.notes && (
                            <p className="text-zinc-500 text-sm mt-1">{booking.notes}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!booking.googleCalendarEventId && isSignedIn && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddToCalendar(booking)}
                            className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800"
                          >
                            <Calendar className="w-4 h-4 mr-1" />
                            Add to Calendar
                          </Button>
                        )}
                        
                        <Select 
                          value={booking.status} 
                          onValueChange={(value) => handleStatusChange(booking, value as Booking['status'])}
                        >
                          <SelectTrigger className="w-32 bg-zinc-950 border-zinc-800 text-white text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-800">
                            <SelectItem value="pending" className="text-white">Pending</SelectItem>
                            <SelectItem value="confirmed" className="text-white">Confirmed</SelectItem>
                            <SelectItem value="cancelled" className="text-white">Cancelled</SelectItem>
                            <SelectItem value="completed" className="text-white">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(booking)}
                          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="calendar">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Calendar View</h3>
                  <p className="text-zinc-400">Calendar integration coming soon with full Google Calendar sync</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Make changes to the booking details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={editFormData.name || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={editFormData.email || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={editFormData.phone || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Service</Label>
              <Select 
                value={editFormData.service} 
                onValueChange={(value) => setEditFormData(prev => ({ ...prev, service: value }))}
              >
                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {SERVICES.map((service) => (
                    <SelectItem key={service.id} value={service.name} className="text-white">
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Notes</Label>
              <Input
                value={editFormData.notes || ''}
                onChange={(e) => setEditFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="bg-zinc-950 border-zinc-800 text-white"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-zinc-700 text-white hover:bg-zinc-800">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Delete Booking</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Are you sure you want to delete this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="border-zinc-700 text-white hover:bg-zinc-800">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Booking Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Booking</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new booking manually.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                value={newBookingData.name}
                onChange={(e) => setNewBookingData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-zinc-950 border-zinc-800 text-white"
                placeholder="Customer name"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={newBookingData.email}
                onChange={(e) => setNewBookingData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-zinc-950 border-zinc-800 text-white"
                placeholder="customer@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={newBookingData.phone}
                onChange={(e) => setNewBookingData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-zinc-950 border-zinc-800 text-white"
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Service *</Label>
              <Select 
                value={newBookingData.service} 
                onValueChange={(value) => setNewBookingData(prev => ({ ...prev, service: value }))}
              >
                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {SERVICES.map((service) => (
                    <SelectItem key={service.id} value={service.name} className="text-white">
                      {service.name} - ${service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-zinc-950 border-zinc-800 text-white hover:bg-zinc-800",
                      !selectedDate && "text-zinc-500"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        setNewBookingData(prev => ({ ...prev, date: format(date, 'yyyy-MM-dd') }));
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="bg-zinc-900"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Time *</Label>
              <Select 
                value={newBookingData.time} 
                onValueChange={(value) => setNewBookingData(prev => ({ ...prev, time: value }))}
              >
                <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 max-h-60">
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time} className="text-white">
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Notes</Label>
              <Input
                value={newBookingData.notes}
                onChange={(e) => setNewBookingData(prev => ({ ...prev, notes: e.target.value }))}
                className="bg-zinc-950 border-zinc-800 text-white"
                placeholder="Any additional notes..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-zinc-700 text-white hover:bg-zinc-800">
              Cancel
            </Button>
            <Button onClick={handleAddBooking} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              Add Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
