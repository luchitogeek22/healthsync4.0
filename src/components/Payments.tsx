import { useState } from 'react';
import { CreditCard, DollarSign, History, Shield, CheckCircle, Download, AlertCircle, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

export function Payments() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: '$29',
      period: '/mes',
      features: [
        '5 videoconsultas al mes',
        'Chat con IA 24/7',
        'Historial médico digital',
        'Recordatorios de medicamentos',
        'Soporte por email'
      ],
      popular: false,
      color: 'from-slate-500 to-slate-600'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$59',
      period: '/mes',
      features: [
        'Videoconsultas ilimitadas',
        'Chat con IA avanzado',
        'Servicios a domicilio',
        'Análisis predictivo',
        'Soporte prioritario 24/7',
        'Descuentos en laboratorios'
      ],
      popular: true,
      color: 'from-emerald-500 to-cyan-500'
    },
    {
      id: 'family',
      name: 'Familiar',
      price: '$99',
      period: '/mes',
      features: [
        'Hasta 5 miembros',
        'Todo de Premium incluido',
        'Gestor familiar de salud',
        'Pediatría especializada',
        'Planes nutricionales',
        'Telemedicina 24/7'
      ],
      popular: false,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: '2025-11-01',
      description: 'Plan Premium - Noviembre',
      amount: '$59.00',
      status: 'paid',
      method: 'Visa •••• 4242'
    },
    {
      id: 2,
      date: '2025-10-01',
      description: 'Plan Premium - Octubre',
      amount: '$59.00',
      status: 'paid',
      method: 'Visa •••• 4242'
    },
    {
      id: 3,
      date: '2025-09-15',
      description: 'Consulta domicilio',
      amount: '$45.00',
      status: 'paid',
      method: 'Mastercard •••• 8888'
    }
  ];

  const savedCards = [
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiry: '09/26',
      isDefault: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    toast.info('Plan seleccionado');
  };

  const handlePayment = () => {
    toast.success('¡Pago procesado exitosamente!');
  };

  const handleDownloadInvoice = (id: number) => {
    toast.success('Descargando factura...');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="gradient-health rounded-2xl p-6 text-white glass">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Wallet className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-white text-3xl">Pagos y Facturación</h1>
            <p className="text-emerald-100">Gestiona tus pagos y suscripciones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="glass-green border-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-sm text-emerald-100 mb-1">Plan Actual</div>
            <div className="text-2xl text-white mb-2">Premium</div>
            <Badge className="bg-white/20 text-white border-0">
              Activo hasta 01/12/2025
            </Badge>
          </div>
          <div className="glass-green border-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-sm text-emerald-100 mb-1">Próximo Pago</div>
            <div className="text-2xl text-white mb-2">$59.00</div>
            <p className="text-xs text-emerald-100">01 de Diciembre</p>
          </div>
          <div className="glass-green border-white/20 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-sm text-emerald-100 mb-1">Total Gastado</div>
            <div className="text-2xl text-white mb-2">$413.00</div>
            <p className="text-xs text-emerald-100">En los últimos 6 meses</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans">Planes</TabsTrigger>
          <TabsTrigger value="methods">Métodos de Pago</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative overflow-hidden transition-all hover-lift ${
                  selectedPlan === plan.id 
                    ? 'border-2 border-emerald-500 ring-2 ring-emerald-200' 
                    : 'glass border-2 border-white/50'
                } ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="gradient-health text-white text-center py-2 text-sm">
                      ⭐ Más Popular
                    </div>
                  </div>
                )}
                <CardHeader className={plan.popular ? 'pt-12' : ''}>
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                      {plan.price}
                    </span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'gradient-health text-white' 
                        : 'border-2 border-emerald-300 hover:bg-emerald-50'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Seleccionado' : 'Seleccionar Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedPlan && (
            <Card className="glass-green border-2 border-emerald-300 animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  Completar Pago
                </CardTitle>
                <CardDescription>
                  Ingresa los detalles de tu tarjeta de forma segura
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label>Número de Tarjeta</Label>
                    <Input 
                      placeholder="1234 5678 9012 3456"
                      className="bg-white/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nombre en Tarjeta</Label>
                    <Input 
                      placeholder="Juan Pérez"
                      className="bg-white/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha de Expiración</Label>
                    <Input 
                      placeholder="MM/AA"
                      className="bg-white/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input 
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      className="bg-white/80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Código Postal</Label>
                    <Input 
                      placeholder="12345"
                      className="bg-white/80"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                  <Shield className="h-5 w-5 text-cyan-600" />
                  <p className="text-sm text-cyan-700">
                    Pago seguro encriptado con SSL de 256 bits
                  </p>
                </div>

                <Button 
                  className="w-full gradient-health text-white text-lg py-6"
                  onClick={handlePayment}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pagar Ahora
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-6">
          <Card className="glass border-2 border-white/50">
            <CardHeader>
              <CardTitle>Tarjetas Guardadas</CardTitle>
              <CardDescription>
                Gestiona tus métodos de pago guardados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedCards.map((card) => (
                <div 
                  key={card.id}
                  className="flex items-center justify-between p-4 rounded-xl border-2 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="capitalize">{card.type}</span>
                        <span className="text-slate-600">•••• {card.last4}</span>
                        {card.isDefault && (
                          <Badge className="bg-emerald-100 text-emerald-700">
                            Predeterminada
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">Expira {card.expiry}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!card.isDefault && (
                      <Button size="sm" variant="outline">
                        Predeterminar
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-red-600">
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full border-2 border-dashed border-emerald-300">
                <CreditCard className="mr-2 h-4 w-4" />
                Agregar Nueva Tarjeta
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-cyan border-2 border-cyan-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-cyan-600 flex-shrink-0" />
                <div>
                  <h4 className="mb-2 text-cyan-900">Seguridad de Pagos</h4>
                  <p className="text-sm text-slate-700 mb-3">
                    Todos tus pagos están protegidos con encriptación de nivel bancario. 
                    No almacenamos información completa de tarjetas.
                  </p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>✓ Certificación PCI DSS Nivel 1</li>
                    <li>✓ Encriptación SSL de 256 bits</li>
                    <li>✓ Autenticación de dos factores</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="glass border-2 border-white/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-emerald-600" />
                Historial de Transacciones
              </CardTitle>
              <CardDescription>
                Tus últimos pagos y facturas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div 
                    key={payment.id}
                    className="flex items-center justify-between p-4 rounded-xl border hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center">
                        {payment.status === 'paid' ? (
                          <CheckCircle className="h-6 w-6 text-emerald-600" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="mb-1">{payment.description}</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <span>{payment.date}</span>
                          <span>•</span>
                          <span>{payment.method}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg mb-1">{payment.amount}</div>
                        <Badge 
                          variant={payment.status === 'paid' ? 'secondary' : 'outline'}
                          className={payment.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : ''}
                        >
                          {payment.status === 'paid' ? 'Pagado' : 'Pendiente'}
                        </Badge>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDownloadInvoice(payment.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                Cargar Más Transacciones
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
