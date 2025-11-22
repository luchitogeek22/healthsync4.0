import { useState } from 'react';
import { FileText, Download, Calendar, Activity, AlertCircle, TrendingUp, Heart, Droplet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

export function MedicalHistory() {
  const medicalRecords = [
    {
      id: 1,
      date: '2025-11-08',
      type: 'Consulta General',
      doctor: 'Dr. María González',
      diagnosis: 'Control de hipertensión',
      notes: 'Presión arterial controlada. Continuar con tratamiento actual.',
      prescriptions: ['Losartán 50mg - 1 vez al día'],
      vitals: {
        bloodPressure: '120/80',
        heartRate: 72,
        temperature: 36.5,
        weight: 68
      }
    },
    {
      id: 2,
      date: '2025-11-05',
      type: 'Análisis de Laboratorio',
      doctor: 'Lab. Ana Torres',
      diagnosis: 'Perfil lipídico completo',
      notes: 'Valores dentro de rangos normales',
      results: [
        { test: 'Colesterol total', value: '185 mg/dL', status: 'normal' },
        { test: 'Colesterol HDL', value: '52 mg/dL', status: 'normal' },
        { test: 'Colesterol LDL', value: '110 mg/dL', status: 'normal' },
        { test: 'Triglicéridos', value: '115 mg/dL', status: 'normal' }
      ]
    },
    {
      id: 3,
      date: '2025-10-20',
      type: 'Control Preventivo',
      doctor: 'Dr. Carlos Ruiz',
      diagnosis: 'Evaluación cardiológica anual',
      notes: 'Función cardiovascular normal. Continuar con hábitos saludables.',
      vitals: {
        bloodPressure: '118/78',
        heartRate: 68,
        temperature: 36.4,
        weight: 67.5
      }
    }
  ];

  const healthMetrics = [
    {
      id: 1,
      name: 'Presión Arterial',
      icon: Heart,
      current: '120/80',
      status: 'normal',
      trend: 'stable',
      color: 'green'
    },
    {
      id: 2,
      name: 'Frecuencia Cardíaca',
      icon: Activity,
      current: '72 bpm',
      status: 'normal',
      trend: 'stable',
      color: 'blue'
    },
    {
      id: 3,
      name: 'Peso',
      icon: TrendingUp,
      current: '68 kg',
      status: 'normal',
      trend: 'down',
      color: 'purple'
    },
    {
      id: 4,
      name: 'IMC',
      icon: Droplet,
      current: '22.4',
      status: 'normal',
      trend: 'stable',
      color: 'orange'
    }
  ];

  const preventiveAlerts = [
    {
      id: 1,
      type: 'Próximo control',
      message: 'Control de presión arterial',
      date: '2025-11-13',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'Vacunación',
      message: 'Vacuna anual recomendada',
      date: '2025-11-25',
      priority: 'low'
    },
    {
      id: 3,
      type: 'Análisis',
      message: 'Perfil metabólico anual',
      date: '2025-12-05',
      priority: 'low'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2>Historial Clínico</h2>
          <p className="text-slate-600">Seguimiento completo de tu salud</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Descargar Historial
        </Button>
      </div>

      {/* Health Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`h-10 w-10 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 text-${metric.color}-600`} />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${
                      metric.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {metric.status === 'normal' ? 'Normal' : 'Atención'}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{metric.name}</p>
                <div className="text-2xl mt-1">{metric.current}</div>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                  <TrendingUp className={`h-3 w-3 ${metric.trend === 'up' ? 'text-red-500' : metric.trend === 'down' ? 'text-green-500' : 'text-slate-400'}`} />
                  <span>
                    {metric.trend === 'stable' ? 'Estable' : metric.trend === 'up' ? 'Subiendo' : 'Bajando'}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Preventive Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Seguimiento Preventivo</CardTitle>
          <CardDescription>Próximas acciones recomendadas para tu salud</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {preventiveAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg"
              >
                <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                  alert.priority === 'high' ? 'bg-red-100' :
                  alert.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <AlertCircle className={`h-5 w-5 ${
                    alert.priority === 'high' ? 'text-red-600' :
                    alert.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p>{alert.type}</p>
                      <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                    </div>
                    <Badge variant="outline" className="flex-shrink-0">
                      {new Date(alert.date).toLocaleDateString('es-MX')}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    Agendar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medical Records */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="consultations">Consultas</TabsTrigger>
          <TabsTrigger value="labs">Laboratorios</TabsTrigger>
          <TabsTrigger value="prescriptions">Recetas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {medicalRecords.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-[#0000FF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{record.type}</CardTitle>
                      <CardDescription>{record.doctor}</CardDescription>
                      <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                        <Calendar className="h-4 w-4" />
                        {new Date(record.date).toLocaleDateString('es-MX', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm">Diagnóstico</p>
                  <p className="text-slate-600 mt-1">{record.diagnosis}</p>
                </div>

                {record.vitals && (
                  <div>
                    <p className="text-sm mb-3">Signos Vitales</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500">Presión Arterial</p>
                        <p>{record.vitals.bloodPressure}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500">Frecuencia Cardíaca</p>
                        <p>{record.vitals.heartRate} bpm</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500">Temperatura</p>
                        <p>{record.vitals.temperature}°C</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-500">Peso</p>
                        <p>{record.vitals.weight} kg</p>
                      </div>
                    </div>
                  </div>
                )}

                {record.results && (
                  <div>
                    <p className="text-sm mb-3">Resultados de Laboratorio</p>
                    <div className="space-y-2">
                      {record.results.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <p className="text-sm">{result.test}</p>
                            <p className="text-xs text-slate-500">{result.value}</p>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={result.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                          >
                            {result.status === 'normal' ? 'Normal' : 'Fuera de rango'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {record.prescriptions && record.prescriptions.length > 0 && (
                  <div>
                    <p className="text-sm mb-2">Prescripciones</p>
                    <div className="space-y-2">
                      {record.prescriptions.map((prescription, index) => (
                        <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm">{prescription}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm">Notas del profesional</p>
                  <p className="text-sm text-slate-600 mt-1">{record.notes}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="consultations">
          <p className="text-center text-slate-500 py-8">Filtro de consultas</p>
        </TabsContent>

        <TabsContent value="labs">
          <p className="text-center text-slate-500 py-8">Filtro de laboratorios</p>
        </TabsContent>

        <TabsContent value="prescriptions">
          <p className="text-center text-slate-500 py-8">Filtro de recetas</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
