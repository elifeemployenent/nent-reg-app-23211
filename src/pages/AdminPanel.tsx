import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import RegistrationsTab from '@/components/admin/RegistrationsTab';
import CategoriesTab from '@/components/admin/CategoriesTab';
import PanchayathsTab from '@/components/admin/PanchayathsTab';
import AnnouncementsTab from '@/components/admin/AnnouncementsTab';
import UtilitiesTab from '@/components/admin/UtilitiesTab';
import AccountsTab from '@/components/admin/AccountsTab';
import ReportsTab from '@/components/admin/ReportsTab';
import AdminUsersTab from '@/components/admin/AdminUsersTab';
import NotificationBell from '@/components/admin/NotificationBell';
import { 
  Users, 
  Grid3X3, 
  MapPin, 
  Bell, 
  Wrench, 
  CreditCard, 
  FileText, 
  Shield 
} from 'lucide-react';

const AdminPanel = () => {
  const { isAdminLoggedIn, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('registrations');

  const tabs = [
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'categories', label: 'Categories', icon: Grid3X3 },
    { id: 'panchayaths', label: 'Panchayaths', icon: MapPin },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'utilities', label: 'Utilities', icon: Wrench },
    { id: 'accounts', label: 'Accounts', icon: CreditCard },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'admin-users', label: 'Admin Control', icon: Shield },
  ];

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'registrations':
        return <RegistrationsTab />;
      case 'categories':
        return <CategoriesTab />;
      case 'panchayaths':
        return <PanchayathsTab />;
      case 'announcements':
        return <AnnouncementsTab />;
      case 'utilities':
        return <UtilitiesTab />;
      case 'accounts':
        return <AccountsTab />;
      case 'reports':
        return <ReportsTab />;
      case 'admin-users':
        return <AdminUsersTab />;
      default:
        return <RegistrationsTab />;
    }
  };

  if (!isAdminLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
        
        {/* Tab Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Card 
                key={tab.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  activeTab === tab.id 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background hover:bg-muted/50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-4 h-24">
                  <IconComponent className="h-6 w-6 mb-2" />
                  <span className="text-xs sm:text-sm font-medium text-center">{tab.label}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;