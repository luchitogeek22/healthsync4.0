import { Check, Sparkles, Heart, Shield, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Pricing() {
  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: '299',
      period: 'mes',
      description: 'Ideal para quien busca atención médica ocasional',
      features: [
        '2 consultas al mes',
        'Videoconsultas ilimitadas',
        'Historial médico digital',
        'Recordatorios de medicamentos',
        'Acceso al centro educativo',
        'Soporte por chat'
      ],
      cta: 'Comenzar',
      popular: false,
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '599',
      period: 'mes',
      description: 'Para quienes necesitan atención médica regular',
      features: [
        '5 consultas al mes a domicilio',
        'Videoconsultas ilimitadas',
        'Historial médico completo',
        'Análisis de laboratorio mensuales',
        'Recordatorios inteligentes con IA',
        'Acceso prioritario a especialistas',
        'Plan nutricional personalizado',
        'Soporte 24/7'
      ],
      cta: 'Plan Recomendado',
      popular: true,
      color: 'purple'
    },
    {
      id: 'family',
      name: 'Familiar',
      price: '999',
      period: 'mes',
      description: 'Protección completa para toda tu familia',
      features: [
        'Consultas ilimitadas a domicilio',
        'Videoconsultas ilimitadas',
        'Hasta 5 perfiles familiares',
        'Análisis de laboratorio mensuales',
        'Asistente IA personalizado',
        'Enfermería a domicilio',
        'Cobertura en emergencias',
        'Descuentos en medicamentos',
        'Gestor de salud familiar dedicado'
      ],
      cta: 'Proteger a mi Familia',
      popular: false,
      color: 'green'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Profesionales Verificados',
      description: 'Todos nuestros médicos están certificados y verificados'
    },
    {
      icon: Heart,
      title: 'Atención Personalizada',
      description: 'Tu salud es única, tu atención también lo será'
    },
    {
      icon: Sparkles,
      title: 'Tecnología IA',
      description: 'Asistente inteligente que aprende de tu salud'
    },
    {
      icon: Star,
      title: 'Satisfacción Garantizada',
      description: '30 días de garantía o te devolvemos tu dinero'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 md:pb-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="bg-[#0000FF] text-white">Planes y Precios</Badge>
        <h1 className="text-4xl md:text-5xl">
          Elige el plan perfecto para tu salud
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Sin contratos a largo plazo. Cancela cuando quieras. 
          Comienza con 14 días de prueba gratis.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${
              plan.popular 
                ? 'border-[#0000FF] border-2 shadow-2xl scale-105' 
                : 'border-slate-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                  Más Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
              <CardDescription className="min-h-[48px]">{plan.description}</CardDescription>
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl text-[#0000FF]">${plan.price}</span>
                  <span className="text-slate-600">MXN/{plan.period}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'bg-[#0000FF] hover:bg-blue-700'
                }`}
              >
                {plan.cta}
              </Button>

              <p className="text-xs text-center text-slate-500">
                14 días de prueba gratis
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-[#0000FF]" />
                </div>
                <h3 className="mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-center">¿Preguntas frecuentes?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4>¿Puedo cambiar de plan en cualquier momento?</h4>
            <p className="text-sm text-slate-600">
              Sí, puedes actualizar o cambiar tu plan cuando lo desees. Los cambios se 
              aplican en el siguiente ciclo de facturación.
            </p>
          </div>
          <div className="space-y-2">
            <h4>¿Qué incluye la prueba gratuita?</h4>
            <p className="text-sm text-slate-600">
              Acceso completo a todas las funciones del plan seleccionado durante 14 días. 
              No se requiere tarjeta de crédito.
            </p>
          </div>
          <div className="space-y-2">
            <h4>¿Los medicamentos están incluidos?</h4>
            <p className="text-sm text-slate-600">
              Las consultas y recetas están incluidas. Los medicamentos tienen descuentos 
              especiales según tu plan.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-[#0000FF] to-blue-600 text-white border-none">
        <CardContent className="py-12 text-center">
          <h2 className="text-3xl mb-4">¿Aún tienes dudas?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte a elegir el plan perfecto 
            para ti y tu familia.
          </p>
          <Button variant="secondary" className="bg-white text-[#0000FF] hover:bg-blue-50">
            Hablar con un Asesor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
