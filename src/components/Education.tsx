import { useState } from 'react';
import { Play, BookOpen, Heart, Brain, Apple, Activity, CheckCircle, Clock, TrendingUp, Award, Volume2, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

export function Education() {
  const [completedCapsules, setCompletedCapsules] = useState<number[]>([1, 3]);
  const [selectedCapsule, setSelectedCapsule] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayCapsule = (capsuleId: number) => {
    setSelectedCapsule(capsuleId);
    setIsPlaying(true);
    toast.success('Reproduciendo cápsula educativa');
    
    // Simulate completion after viewing
    setTimeout(() => {
      if (!completedCapsules.includes(capsuleId)) {
        setCompletedCapsules([...completedCapsules, capsuleId]);
        toast.success('¡Cápsula completada! +10 puntos de conocimiento');
      }
      setIsPlaying(false);
    }, 3000);
  };

  const handleDownload = (capsuleName: string) => {
    toast.success(`Descargando: ${capsuleName}`);
  };

  const categories = [
    { id: 'all', name: 'Todos', icon: BookOpen },
    { id: 'prevention', name: 'Prevención', icon: Heart },
    { id: 'nutrition', name: 'Nutrición', icon: Apple },
    { id: 'mental', name: 'Salud Mental', icon: Brain },
    { id: 'exercise', name: 'Ejercicio', icon: Activity }
  ];

  const capsules = [
    {
      id: 1,
      title: 'Prevención de Enfermedades Cardiovasculares',
      description: 'Conoce los factores de riesgo y cómo prevenirlos',
      category: 'prevention',
      duration: '8 min',
      level: 'Básico',
      views: 1250,
      completed: true,
      thumbnail: 'heart',
      color: 'red'
    },
    {
      id: 2,
      title: 'Alimentación Balanceada para el Corazón',
      description: 'Guía práctica de nutrición cardiovascular',
      category: 'nutrition',
      duration: '10 min',
      level: 'Intermedio',
      views: 980,
      completed: false,
      thumbnail: 'apple',
      color: 'green'
    },
    {
      id: 3,
      title: 'Manejo del Estrés y Ansiedad',
      description: 'Técnicas efectivas para el bienestar mental',
      category: 'mental',
      duration: '12 min',
      level: 'Básico',
      views: 1450,
      completed: true,
      thumbnail: 'brain',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Ejercicio en Casa: Rutina Cardio',
      description: 'Ejercicios seguros para mejorar tu salud cardiovascular',
      category: 'exercise',
      duration: '15 min',
      level: 'Básico',
      views: 2100,
      completed: false,
      thumbnail: 'activity',
      color: 'blue'
    },
    {
      id: 5,
      title: 'Control de Presión Arterial',
      description: 'Aprende a monitorear y controlar tu presión',
      category: 'prevention',
      duration: '7 min',
      level: 'Básico',
      views: 890,
      completed: false,
      thumbnail: 'heart',
      color: 'red'
    },
    {
      id: 6,
      title: 'Sueño y Salud: La Conexión',
      description: 'Importancia del descanso para tu bienestar',
      category: 'mental',
      duration: '9 min',
      level: 'Básico',
      views: 1320,
      completed: false,
      thumbnail: 'brain',
      color: 'purple'
    }
  ];

  const learningPath = {
    totalCapsules: capsules.length,
    completed: completedCapsules.length,
    progress: (completedCapsules.length / capsules.length) * 100,
    streak: 5
  };

  const getThumbnailIcon = (thumbnail: string) => {
    switch (thumbnail) {
      case 'heart': return Heart;
      case 'apple': return Apple;
      case 'brain': return Brain;
      case 'activity': return Activity;
      default: return BookOpen;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <h2>Centro Educativo</h2>
        <p className="text-slate-600">Aprende a cuidar tu salud con contenido especializado</p>
      </div>

      {/* Learning Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Tu Progreso de Aprendizaje</CardTitle>
            <CardDescription>Continúa aprendiendo para mejorar tu salud</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Cápsulas completadas</span>
                <span className="text-sm">
                  {learningPath.completed} de {learningPath.totalCapsules}
                </span>
              </div>
              <Progress value={learningPath.progress} className="h-3" />
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl text-[#0000FF]">{learningPath.completed}</div>
                  <p className="text-xs text-slate-600">Completadas</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-[#0000FF]">{learningPath.streak}</div>
                  <p className="text-xs text-slate-600">Días consecutivos</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-[#0000FF]">{Math.round(learningPath.progress)}%</div>
                  <p className="text-xs text-slate-600">Progreso total</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#0000FF] to-blue-600 text-white">
          <CardContent className="pt-6">
            <TrendingUp className="h-8 w-8 mb-3" />
            <div className="text-3xl mb-1">{learningPath.streak}</div>
            <p className="text-sm text-blue-100">Días de racha</p>
            <p className="text-xs text-blue-200 mt-2">
              ¡Sigue así! El aprendizaje constante mejora tu salud.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capsules.map((capsule) => {
              const Icon = getThumbnailIcon(capsule.thumbnail);
              const isCompleted = completedCapsules.includes(capsule.id);
              
              return (
                <Card 
                  key={capsule.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    isCompleted ? 'border-green-200 bg-green-50/30' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`h-14 w-14 bg-${capsule.color}-100 rounded-xl flex items-center justify-center`}>
                        <Icon className={`h-7 w-7 text-${capsule.color}-600`} />
                      </div>
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completada
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{capsule.title}</CardTitle>
                    <CardDescription>{capsule.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {capsule.duration}
                        </span>
                        <Badge variant="outline">{capsule.level}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button 
                          className={`w-full ${
                            isCompleted 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-[#0000FF] hover:bg-blue-700'
                          }`}
                          onClick={() => handlePlayCapsule(capsule.id)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {isCompleted ? 'Ver de nuevo' : 'Comenzar'}
                        </Button>
                        <Button 
                          className="bg-gray-200 hover:bg-gray-300"
                          onClick={() => handleDownload(capsule.title)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {['prevention', 'nutrition', 'mental', 'exercise'].map((categoryId) => (
          <TabsContent key={categoryId} value={categoryId} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {capsules
                .filter((capsule) => capsule.category === categoryId)
                .map((capsule) => {
                  const Icon = getThumbnailIcon(capsule.thumbnail);
                  const isCompleted = completedCapsules.includes(capsule.id);
                  
                  return (
                    <Card 
                      key={capsule.id} 
                      className={`hover:shadow-lg transition-shadow cursor-pointer ${
                        isCompleted ? 'border-green-200 bg-green-50/30' : ''
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className={`h-14 w-14 bg-${capsule.color}-100 rounded-xl flex items-center justify-center`}>
                            <Icon className={`h-7 w-7 text-${capsule.color}-600`} />
                          </div>
                          {isCompleted && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completada
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{capsule.title}</CardTitle>
                        <CardDescription>{capsule.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {capsule.duration}
                            </span>
                            <Badge variant="outline">{capsule.level}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <Button 
                              className={`w-full ${
                                isCompleted 
                                  ? 'bg-green-600 hover:bg-green-700' 
                                  : 'bg-[#0000FF] hover:bg-blue-700'
                              }`}
                              onClick={() => handlePlayCapsule(capsule.id)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              {isCompleted ? 'Ver de nuevo' : 'Comenzar'}
                            </Button>
                            <Button 
                              className="bg-gray-200 hover:bg-gray-300"
                              onClick={() => handleDownload(capsule.title)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Descargar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Recommended Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendado para ti</CardTitle>
          <CardDescription>Basado en tu historial y objetivos de salud</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3>Serie: Salud Cardiovascular Integral</h3>
                <p className="text-slate-600 mt-2">
                  Un programa completo de 6 cápsulas diseñado específicamente para personas 
                  con hipertensión controlada. Aprende sobre prevención, nutrición y estilo de vida.
                </p>
                <Button className="mt-4 bg-[#0000FF] hover:bg-blue-700">
                  Comenzar Serie
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Capsule Player Dialog */}
      {selectedCapsule !== null && (
        <Dialog open={isPlaying} onOpenChange={setIsPlaying}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{capsules.find(c => c.id === selectedCapsule)?.title}</DialogTitle>
              <DialogDescription>
                {capsules.find(c => c.id === selectedCapsule)?.description}
              </DialogDescription>
            </DialogHeader>
            <CardContent className="p-0">
              <ImageWithFallback
                src="/path/to/capsule/image.jpg"
                alt="Capsule Image"
                className="w-full h-96 object-cover"
              />
            </CardContent>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}