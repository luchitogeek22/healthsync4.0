import { useState } from 'react';
import { Home, Calendar, FileText, GraduationCap, Users, User, Bell, Sparkles, CreditCard, Stethoscope } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Profile } from './components/Profile';
import { Appointments } from './components/Appointments';
import { MedicalHistory } from './components/MedicalHistory';
import { Education } from './components/Education';
import { Professionals } from './components/Professionals';
import { AIAssistant } from './components/AIAssistant';
import { SymptomChecker } from './components/SymptomChecker';
import { Telemedicine } from './components/Telemedicine';
import { Login } from './components/Login';
import { Pricing } from './components/Pricing';
import { LandingPage } from './components/LandingPage';
import { DoctorPanel } from './components/DoctorPanel';
import { Payments } from './components/Payments';
import { Toaster } from './components/ui/sonner';
import logo from 'figma:asset/1af4e7848ffa6724c23ac598b3188021718672d3.png';

type View = 'landing' | 'dashboard' | 'profile' | 'appointments' | 'history' | 'education' | 'professionals' | 'ai' | 'pricing' | 'symptom-checker' | 'telemedicine' | 'doctor-panel' | 'payments' | 'settings';
type UserRole = 'patient' | 'doctor' | null;

const navigation = [
  { id: 'dashboard' as View, label: 'Inicio', icon: Home },
  { id: 'appointments' as View, label: 'Citas', icon: Calendar },
  { id: 'history' as View, label: 'Historial', icon: FileText },
  { id: 'education' as View, label: 'Educación', icon: GraduationCap },
  { id: 'professionals' as View, label: 'Profesionales', icon: Users },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('patient');

  // Show landing page if not authenticated and showLanding is true
  if (!isAuthenticated && showLanding) {
    return (
      <>
        <LandingPage onGetStarted={() => setShowLanding(false)} />
        <Toaster />
      </>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={(role) => {
          setIsAuthenticated(true);
          setUserRole(role);
          setCurrentView(role === 'doctor' ? 'doctor-panel' : 'dashboard');
        }} />
        <Toaster />
      </>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'profile':
        return <Profile />;
      case 'appointments':
        return <Appointments />;
      case 'history':
        return <MedicalHistory />;
      case 'education':
        return <Education />;
      case 'professionals':
        return <Professionals />;
      case 'pricing':
        return <Pricing />;
      case 'symptom-checker':
        return <SymptomChecker onNavigate={setCurrentView} />;
      case 'telemedicine':
        return <Telemedicine />;
      case 'doctor-panel':
        return <DoctorPanel />;
      case 'payments':
        return <Payments />;
      case 'settings':
        return <div className="p-4">Configuración</div>;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
      {/* Header */}
      <header className="glass border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 animate-fade-in">
              <img src={logo} alt="HealthSync 4.0" className="h-12 w-12" />
              <div>
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 text-2xl">
                  HealthSync 4.0
                </h1>
                <p className="text-xs text-slate-600">Tu salud, en casa</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView('payments')}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                <CreditCard className="h-4 w-4 text-emerald-600" />
                <span className="text-sm">Pagos</span>
              </button>
              <button 
                className="relative p-2 hover:bg-white/60 rounded-full transition-all"
                onClick={() => setHasUnreadNotifications(false)}
              >
                <Bell className="h-5 w-5 text-slate-600" />
                {hasUnreadNotifications && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse-soft"></span>
                )}
              </button>
              <button 
                onClick={() => setCurrentView('profile')}
                className="flex items-center gap-2 p-2 hover:bg-white/60 rounded-lg transition-all"
              >
                <div className="h-8 w-8 gradient-health rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm hidden sm:block">Mi Perfil</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Side Navigation - Desktop */}
        <nav className="hidden md:block w-64 flex-shrink-0">
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 glass border-r border-white/30 overflow-y-auto">
            <div className="p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all hover-lift ${
                      isActive 
                        ? 'gradient-health text-white shadow-lg' 
                        : 'text-slate-700 hover:bg-white/60'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {/* Quick Links */}
              <div className="pt-4 mt-4 border-t border-white/30">
                <button
                  onClick={() => setCurrentView('payments')}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-white/60 transition-all"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Pagos</span>
                </button>
                {userRole === 'doctor' && (
                  <button
                    onClick={() => setCurrentView('doctor-panel')}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-white/60 transition-all"
                  >
                    <Stethoscope className="h-5 w-5" />
                    <span>Panel Doctor</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/30 md:hidden z-50">
        <div className="flex items-center justify-around py-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  isActive ? 'text-emerald-600' : 'text-slate-600'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'animate-pulse-soft' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* AI Assistant FAB */}
      <button
        onClick={() => setShowAIChat(!showAIChat)}
        className="fixed bottom-20 md:bottom-8 right-8 h-16 w-16 gradient-health text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all flex items-center justify-center z-40 group animate-float"
      >
        <Sparkles className="h-7 w-7 animate-pulse-soft" />
        <span className="absolute right-full mr-3 glass text-slate-900 text-sm px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          💬 Asistente IA
        </span>
      </button>

      {/* AI Chat Panel */}
      {showAIChat && (
        <div className="animate-slide-in-right">
          <AIAssistant onClose={() => setShowAIChat(false)} />
        </div>
      )}

      {/* Toaster */}
      <Toaster />
    </div>
  );
}