import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Heart, AlertTriangle, Edit2, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ana María Pérez',
    email: 'ana.perez@email.com',
    phone: '+52 55 1234 5678',
    birthDate: '1985-06-15',
    address: 'Calle Principal 123, Col. Centro, CDMX',
    bloodType: 'O+',
    emergencyContact: 'Juan Pérez - +52 55 8765 4321'
  });

  const [healthInfo, setHealthInfo] = useState({
    allergies: ['Penicilina', 'Mariscos'],
    conditions: ['Hipertensión controlada'],
    medications: ['Losartán 50mg - 1 vez al día'],
    insurance: 'Seguro Popular Plus'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="h-24 w-24 bg-gradient-to-br from-[#0000FF] to-blue-600 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2>{profile.name}</h2>
              <p className="text-slate-600">{profile.email}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge variant="secondary">Paciente Activo</Badge>
                <Badge variant="outline">Desde 2024</Badge>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? 'default' : 'outline'}
              className={isEditing ? 'bg-[#0000FF] hover:bg-blue-700' : ''}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Información Personal</TabsTrigger>
          <TabsTrigger value="medical">Información Médica</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Datos Personales</CardTitle>
              <CardDescription>Información básica de contacto y ubicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <Input
                      id="name"
                      value={profile.name}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <Input
                      id="birthDate"
                      type="date"
                      value={profile.birthDate}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <Input
                    id="address"
                    value={profile.address}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto de Emergencia</CardTitle>
              <CardDescription>Persona a contactar en caso de emergencia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="emergency">Nombre y teléfono</Label>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <Input
                    id="emergency"
                    value={profile.emergencyContact}
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Médica</CardTitle>
              <CardDescription>Datos importantes para tu atención médica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de sangre</Label>
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span>{profile.bloodType}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Alergias</Label>
                <div className="flex flex-wrap gap-2">
                  {healthInfo.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="bg-red-100 text-red-800">
                      {allergy}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">+ Agregar</Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Condiciones crónicas</Label>
                <div className="flex flex-wrap gap-2">
                  {healthInfo.conditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {condition}
                    </Badge>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm">+ Agregar</Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Medicamentos actuales</Label>
                <div className="space-y-2">
                  {healthInfo.medications.map((medication, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm">{medication}</p>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm" className="w-full">+ Agregar medicamento</Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Seguro médico</Label>
                <Input
                  value={healthInfo.insurance}
                  disabled={!isEditing}
                  onChange={(e) => setHealthInfo({ ...healthInfo, insurance: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">
                    Esta información es crucial para tu seguridad. Asegúrate de mantenerla actualizada 
                    y compártela con los profesionales de salud durante tus consultas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
