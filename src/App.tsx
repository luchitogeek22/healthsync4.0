import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Home, Calendar, FileText, GraduationCap, Users, User, Bell, Sparkles, CreditCard, Stethoscope, LogOut } from 'lucide-react';
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
import { supabase } from './lib/supabase';
import { getProfile, signOut, type Profile as UserProfile } from './services/auth';
import { toast } from 'sonner';
import logo from 'figma:asset/1af4e7848ffa6724c23ac598b3188021718672d3.png';

type View = 'landing' | 'dashboard' | 'profile' | 'appointments' | 'history' | 'education' | 'professionals' | 'ai' | 'pricing' | 'symptom-checker' | 'telemedicine' | 'doctor-panel' | 'payments' | 'settings';

const navigation = [
  { id: 'dashboard' as View, label: 'Inicio', icon: Home },
  { id: 'appointments' as View, label: 'Citas', icon: Calendar },
  { id: 'history' as View, label: 'Historial', icon: FileText },
  { id: 'education' as View, label: 'Educación', icon: GraduationCap },
  { id: 'professionals' as View, label: 'Profesionales', icon: Users },
];

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }

    const loadSession = async (nextSession: Session | null) => {
      setSession(nextSession);
      setProfile(null);
      if (nextSession) {
        try {
          const nextProfile = await getProfile(nextSession.user.id);
          setProfile(nextProfile);
          setCurrentView(nextProfile.role === 'DOCTOR' || nextProfile.role === 'ADMIN' ? 'doctor-panel' : 'dashboard');
        } catch {
          toast.error('No se pudo cargar el perfil autorizado.');
        }
      }
      setAuthReady(true);
    };

    void supabase.auth.getSession().then(({ data }) => loadSession(data.session));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void loadSession(nextSession);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowLanding(true);
      toast.success('Sesión cerrada');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo cerrar la sesión');
    }
  };

  if (!authReady) return <div className="min-h-screen grid place-items-center text-slate-600">Cargando sesión…</div>;

  if (!session && showLanding) {
    return <><LandingPage onGetStarted={() => setShowLanding(false)} /><Toaster /></>;
  }

  if (!session) {
    return <><Login onAuthenticated={() => setShowLanding(false)} /><Toaster /></>;
  }

  const isClinician = profile?.role === 'DOCTOR' || profile?.role === 'ADMIN';
  const renderView = () => {
    switch (currentView) {
      case 'profile': return <Profile />;
      case 'appointments': return <Appointments />;
      case 'history': return <MedicalHistory />;
      case 'education': return <Education />;
      case 'professionals': return <Professionals />;
      case 'pricing': return <Pricing />;
      case 'symptom-checker': return <SymptomChecker onNavigate={setCurrentView} />;
      case 'telemedicine': return <Telemedicine />;
      case 'doctor-panel': return isClinician ? <DoctorPanel /> : <Dashboard onNavigate={setCurrentView} />;
      case 'payments': return <Payments />;
      case 'settings': return <div className="p-4">Configuración</div>;
      default: return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
      <header className="glass border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="HealthSync 4.0" className="h-12 w-12" />
            <div><h1 className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 text-2xl">HealthSync 4.0</h1><p className="text-xs text-slate-600">Tu salud, en casa</p></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentView('payments')} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/60"><CreditCard className="h-4 w-4 text-emerald-600" /><span className="text-sm">Pagos</span></button>
            <button className="relative p-2 hover:bg-white/60 rounded-full" onClick={() => setHasUnreadNotifications(false)} aria-label="Notificaciones"><Bell className="h-5 w-5 text-slate-600" />{hasUnreadNotifications && <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />}</button>
            <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 p-2 hover:bg-white/60 rounded-lg"><div className="h-8 w-8 gradient-health rounded-full flex items-center justify-center"><User className="h-5 w-5 text-white" /></div><span className="text-sm hidden sm:block">{profile?.full_name || session.user.email}</span></button>
            <button onClick={handleSignOut} className="p-2 rounded-lg hover:bg-white/60" aria-label="Cerrar sesión"><LogOut className="h-5 w-5 text-slate-600" /></button>
          </div>
        </div>
      </header>
      <div className="flex">
        <nav className="hidden md:block w-64 flex-shrink-0"><div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 glass border-r border-white/30 overflow-y-auto p-4 space-y-2">
          {navigation.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setCurrentView(id)} className={"flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all " + (currentView === id ? 'gradient-health text-white shadow-lg' : 'text-slate-700 hover:bg-white/60')}><Icon className="h-5 w-5" /><span>{label}</span></button>)}
          <div className="pt-4 mt-4 border-t border-white/30">
            {isClinician && <button onClick={() => setCurrentView('doctor-panel')} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-white/60"><Stethoscope className="h-5 w-5" /><span>Panel clínico</span></button>}
          </div>
        </div></nav>
        <main className="flex-1 min-w-0"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderView()}</div></main>
      </div>
      <button onClick={() => setShowAIChat(!showAIChat)} className="fixed bottom-20 md:bottom-8 right-8 h-16 w-16 gradient-health text-white rounded-full shadow-2xl flex items-center justify-center z-40" aria-label="Asistente IA"><Sparkles className="h-7 w-7" /></button>
      {showAIChat && <div className="animate-slide-in-right"><AIAssistant onClose={() => setShowAIChat(false)} /></div>}
      <Toaster />
    </div>
  );
}
