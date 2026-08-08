import { useState } from 'react';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { signIn, signUp } from '../services/auth';
import { toast } from 'sonner';
import logo from 'figma:asset/1af4e7848ffa6724c23ac598b3188021718672d3.png';

interface LoginProps { onAuthenticated: () => void; }

export function Login({ onAuthenticated }: LoginProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
        onAuthenticated();
        toast.success('Sesión iniciada');
      } else {
        await signUp(email, password, fullName);
        toast.success('Revisa tu correo para confirmar el registro antes de iniciar sesión.');
        setMode('signin');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No se pudo completar la operación.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen gradient-health-soft flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass border-2 border-white/50 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4"><img src={logo} alt="HealthSync 4.0" className="h-12 w-12" /><CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">HealthSync 4.0</CardTitle></div>
          <CardTitle>{mode === 'signin' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}</CardTitle>
          <CardDescription>{mode === 'signin' ? 'Inicia sesión para continuar' : 'Los nuevos registros se crean como pacientes.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && <div className="space-y-2"><Label htmlFor="fullName">Nombre completo</Label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input id="fullName" className="pl-10 bg-white/80" value={fullName} onChange={(event) => setFullName(event.target.value)} required /></div></div>}
            <div className="space-y-2"><Label htmlFor="email">Correo electrónico</Label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input id="email" type="email" className="pl-10 bg-white/80" value={email} onChange={(event) => setEmail(event.target.value)} required /></div></div>
            <div className="space-y-2"><Label htmlFor="password">Contraseña</Label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" /><Input id="password" type="password" minLength={8} className="pl-10 bg-white/80" value={password} onChange={(event) => setPassword(event.target.value)} required /></div></div>
            <Button type="submit" disabled={submitting} className="w-full gradient-health text-white text-lg py-6">{submitting ? 'Procesando…' : mode === 'signin' ? 'Iniciar sesión' : 'Crear cuenta'}<ArrowRight className="ml-2 h-5 w-5" /></Button>
            <p className="text-center text-sm text-slate-600">{mode === 'signin' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="text-emerald-600 hover:underline">{mode === 'signin' ? 'Regístrate' : 'Inicia sesión'}</button></p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
