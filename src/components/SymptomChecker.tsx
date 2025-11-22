import { useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, Activity, Thermometer, Heart, Loader2, ArrowRight, ArrowLeft, Sparkles, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Symptom {
  id: number;
  name: string;
  severity: 'low' | 'medium' | 'high';
  duration: string;
  bodyPart: string;
}

interface DiagnosisResult {
  condition: string;
  probability: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
  urgency: string;
}

interface SymptomCheckerProps {
  onNavigate?: (view: string) => void;
}

export function SymptomChecker({ onNavigate }: SymptomCheckerProps) {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    name: '',
    severity: 'medium' as 'low' | 'medium' | 'high',
    duration: '',
    bodyPart: ''
  });
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    gender: '',
    temperature: '',
    bloodPressure: '',
    additionalInfo: ''
  });
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[]>([]);

  const bodyParts = [
    'Cabeza', 'Garganta', 'Pecho', 'Abdomen', 'Espalda', 
    'Brazos', 'Piernas', 'Articulaciones', 'Piel', 'General'
  ];

  const commonSymptoms = [
    'Dolor de cabeza', 'Fiebre', 'Tos', 'Dolor de garganta', 
    'Náuseas', 'Fatiga', 'Mareos', 'Dolor muscular',
    'Dificultad para respirar', 'Dolor abdominal'
  ];

  const addSymptom = () => {
    if (currentSymptom.name && currentSymptom.bodyPart && currentSymptom.duration) {
      setSymptoms([...symptoms, { 
        id: symptoms.length + 1, 
        ...currentSymptom 
      }]);
      setCurrentSymptom({
        name: '',
        severity: 'medium',
        duration: '',
        bodyPart: ''
      });
    }
  };

  const removeSymptom = (id: number) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const analyzeSymptoms = () => {
    setIsAnalyzing(true);
    setStep(3);

    // Simulación de análisis por IA
    setTimeout(() => {
      const results: DiagnosisResult[] = generateDiagnosis();
      setDiagnosisResults(results);
      setIsAnalyzing(false);
    }, 3000);
  };

  const generateDiagnosis = (): DiagnosisResult[] => {
    // Lógica simulada de IA basada en síntomas
    const hasFever = symptoms.some(s => s.name.toLowerCase().includes('fiebre'));
    const hasCough = symptoms.some(s => s.name.toLowerCase().includes('tos'));
    const hasHeadache = symptoms.some(s => s.name.toLowerCase().includes('cabeza'));
    const hasThroat = symptoms.some(s => s.name.toLowerCase().includes('garganta'));
    const highSeverityCount = symptoms.filter(s => s.severity === 'high').length;

    const results: DiagnosisResult[] = [];

    if (hasFever && hasCough && hasThroat) {
      results.push({
        condition: 'Infección Respiratoria Aguda',
        probability: 85,
        severity: highSeverityCount > 1 ? 'high' : 'medium',
        description: 'Probable infección viral del tracto respiratorio superior con síntomas característicos.',
        recommendations: [
          'Descanso adecuado (7-8 horas)',
          'Aumentar ingesta de líquidos (2-3 litros al día)',
          'Monitorear temperatura cada 4 horas',
          'Evitar contacto cercano con otras personas',
          'Considerar consulta médica si los síntomas empeoran'
        ],
        urgency: 'Consulta recomendada en 24-48 horas'
      });
    }

    if (hasHeadache && hasFever) {
      results.push({
        condition: 'Síndrome Gripal',
        probability: 72,
        severity: 'medium',
        description: 'Cuadro compatible con influenza o gripe común con manifestaciones sistémicas.',
        recommendations: [
          'Reposo en casa',
          'Analgésicos como paracetamol según indicación',
          'Alimentación ligera y nutritiva',
          'Higiene de manos frecuente',
          'Ventilación adecuada de espacios'
        ],
        urgency: 'Monitoreo en casa, consultar si persiste >3 días'
      });
    }

    if (symptoms.length > 0 && results.length === 0) {
      results.push({
        condition: 'Malestar General',
        probability: 65,
        severity: 'low',
        description: 'Los síntomas reportados requieren evaluación para determinar causa específica.',
        recommendations: [
          'Observar evolución de síntomas',
          'Mantener hidratación adecuada',
          'Descanso apropiado',
          'Registro de temperatura si es necesario',
          'Consulta médica si síntomas persisten o empeoran'
        ],
        urgency: 'Seguimiento en 48-72 horas'
      });
    }

    // Agregar segunda opción diagnóstica
    if (results.length === 1) {
      results.push({
        condition: 'Diagnóstico Diferencial',
        probability: 45,
        severity: 'low',
        description: 'Otras posibles causas que deben considerarse según evolución clínica.',
        recommendations: [
          'Llevar registro detallado de síntomas',
          'Anotar factores que mejoran o empeoran',
          'Consultar con profesional de salud para evaluación completa'
        ],
        urgency: 'Evaluación profesional recomendada'
      });
    }

    return results;
  };

  const resetChecker = () => {
    setStep(1);
    setSymptoms([]);
    setDiagnosisResults([]);
    setPatientInfo({
      age: '',
      gender: '',
      temperature: '',
      bloodPressure: '',
      additionalInfo: ''
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-white">Diagnóstico Inteligente por IA</h1>
            <p className="text-purple-100">Análisis preliminar basado en síntomas</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-white mb-1">Importante: Este es un sistema de orientación</p>
              <p className="text-purple-100">
                No reemplaza el diagnóstico médico profesional. Para condiciones graves o 
                emergencias, busque atención médica inmediata.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between max-w-md mx-auto">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= s 
                ? 'bg-[#0000FF] text-white' 
                : 'bg-slate-200 text-slate-500'
            }`}>
              {s}
            </div>
            {s < 3 && (
              <div className={`h-1 w-16 md:w-24 ${
                step > s ? 'bg-[#0000FF]' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Patient Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Información del Paciente</CardTitle>
            <CardDescription>
              Proporciona información básica para un análisis más preciso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Ej: 35"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Sexo</Label>
                <Select 
                  value={patientInfo.gender}
                  onValueChange={(value) => setPatientInfo({...patientInfo, gender: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Femenino</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperatura (°C)</Label>
                <div className="relative">
                  <Thermometer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    placeholder="36.5"
                    className="pl-10"
                    value={patientInfo.temperature}
                    onChange={(e) => setPatientInfo({...patientInfo, temperature: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bp">Presión Arterial</Label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="bp"
                    placeholder="120/80"
                    className="pl-10"
                    value={patientInfo.bloodPressure}
                    onChange={(e) => setPatientInfo({...patientInfo, bloodPressure: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additional">Información Adicional (Opcional)</Label>
              <Textarea
                id="additional"
                placeholder="Condiciones médicas preexistentes, alergias, medicamentos actuales..."
                rows={3}
                value={patientInfo.additionalInfo}
                onChange={(e) => setPatientInfo({...patientInfo, additionalInfo: e.target.value})}
              />
            </div>
            <Button 
              className="w-full bg-[#0000FF] hover:bg-blue-700"
              onClick={() => setStep(2)}
              disabled={!patientInfo.age || !patientInfo.gender}
            >
              Continuar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Symptom Input */}
      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registrar Síntomas</CardTitle>
              <CardDescription>
                Describe tus síntomas con el mayor detalle posible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick symptom selection */}
              <div className="space-y-2">
                <Label>Síntomas Comunes</Label>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant="outline"
                      className="cursor-pointer hover:bg-slate-100"
                      onClick={() => setCurrentSymptom({...currentSymptom, name: symptom})}
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="symptom-name">Síntoma</Label>
                  <Input
                    id="symptom-name"
                    placeholder="Describe el síntoma..."
                    value={currentSymptom.name}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-part">Parte del Cuerpo</Label>
                  <Select 
                    value={currentSymptom.bodyPart}
                    onValueChange={(value) => setCurrentSymptom({...currentSymptom, bodyPart: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {bodyParts.map((part) => (
                        <SelectItem key={part} value={part}>{part}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración</Label>
                  <Input
                    id="duration"
                    placeholder="Ej: 2 días, 5 horas"
                    value={currentSymptom.duration}
                    onChange={(e) => setCurrentSymptom({...currentSymptom, duration: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Severidad</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'medium', 'high'] as const).map((severity) => (
                      <button
                        key={severity}
                        type="button"
                        onClick={() => setCurrentSymptom({...currentSymptom, severity})}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          currentSymptom.severity === severity
                            ? severity === 'low' 
                              ? 'border-green-500 bg-green-50' 
                              : severity === 'medium'
                              ? 'border-yellow-500 bg-yellow-50'
                              : 'border-red-500 bg-red-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-sm">
                          {severity === 'low' ? 'Leve' : severity === 'medium' ? 'Moderado' : 'Severo'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={addSymptom}
                variant="outline"
                className="w-full"
                disabled={!currentSymptom.name || !currentSymptom.bodyPart || !currentSymptom.duration}
              >
                Agregar Síntoma
              </Button>
            </CardContent>
          </Card>

          {/* Symptoms List */}
          {symptoms.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Síntomas Registrados ({symptoms.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {symptoms.map((symptom) => (
                  <div 
                    key={symptom.id}
                    className="flex items-start justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p>{symptom.name}</p>
                        <Badge variant="outline" className={getSeverityColor(symptom.severity)}>
                          {symptom.severity === 'low' ? 'Leve' : symptom.severity === 'medium' ? 'Moderado' : 'Severo'}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p>📍 {symptom.bodyPart}</p>
                        <p>⏱️ Duración: {symptom.duration}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSymptom(symptom.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
            </Button>
            <Button 
              className="flex-1 bg-[#0000FF] hover:bg-blue-700"
              onClick={analyzeSymptoms}
              disabled={symptoms.length === 0}
            >
              Analizar con IA <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Analysis Results */}
      {step === 3 && (
        <div className="space-y-6">
          {isAnalyzing ? (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-[#0000FF] animate-spin" />
                  </div>
                </div>
                <h3 className="mb-2">Analizando síntomas con IA...</h3>
                <p className="text-slate-600 mb-4">
                  Procesando información y comparando con base de conocimientos médicos
                </p>
                <Progress value={66} className="max-w-md mx-auto" />
              </CardContent>
            </Card>
          ) : (
            <>
              {diagnosisResults.map((result, index) => (
                <Card key={index} className={index === 0 ? 'border-2 border-[#0000FF]' : ''}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{result.condition}</CardTitle>
                          {index === 0 && (
                            <Badge className="bg-[#0000FF]">Principal</Badge>
                          )}
                        </div>
                        <CardDescription>{result.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl text-[#0000FF] mb-1">{result.probability}%</div>
                        <p className="text-xs text-slate-500">Probabilidad</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={getSeverityColor(result.severity)}>
                        Severidad: {result.severity === 'low' ? 'Baja' : result.severity === 'medium' ? 'Media' : 'Alta'}
                      </Badge>
                      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-800">
                        {result.urgency}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="mb-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Recomendaciones
                      </h4>
                      <ul className="space-y-2">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <ArrowRight className="h-4 w-4 text-[#0000FF] flex-shrink-0 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="pt-6">
                    <Calendar className="h-8 w-8 text-[#0000FF] mb-3" />
                    <h3 className="mb-2">Agendar Consulta</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Consulta con un profesional de salud para evaluación completa
                    </p>
                    <Button 
                      className="w-full bg-[#0000FF] hover:bg-blue-700"
                      onClick={() => onNavigate?.('appointments')}
                    >
                      Agendar Ahora
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="pt-6">
                    <Activity className="h-8 w-8 text-purple-600 mb-3" />
                    <h3 className="mb-2">Telemedicina Inmediata</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Videoconsulta con médico disponible ahora
                    </p>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => onNavigate?.('telemedicine')}
                    >
                      Iniciar Videoconsulta
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={resetChecker}
                  className="flex-1"
                >
                  Nuevo Análisis
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.print()}
                  className="flex-1"
                >
                  Imprimir Resultados
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
