import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  personaForm: FormGroup;
  paises: any;
  estados: any;
  personas: any;

  constructor(
    public fb: FormBuilder,
    public estadoService: EstadosService,
    public paisService: PaisesService,
    public personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      idpersona: [' '],
      nombre: [' ', Validators.required],
      apellido: [' ', Validators.required],
      edad: [' ', Validators.required],
      pais: [' ', Validators.required],
      estado: [' ', Validators.required],
    });

    this.personaService.getAllPersonas().subscribe(
      (resp) => {
        this.personas = resp;
        console.log(resp);
        console.log(this.personas);
      },
      (error) => {
        console.log(error);
      }
    );
    this.paisService.getAllPaises().subscribe(
      (resp) => {
        this.paises = resp;
        console.log(resp);
      },
      (error) => console.error(error)
    );

    this.personaForm.get('pais')?.valueChanges.subscribe(
      (value) => {
        this.estadoService.getAllEstadosByPais(value.id).subscribe((resp) => {
          this.estados = resp;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(
      (resp) => {
        this.personas.filter(
          (persona: any) => resp.idpersona !== persona.idpersona
        );
        this.personas.push(resp);
        this.personaForm.reset();
      },
      (error) => {
        console.log('A sucedido un error');
        console.error(error);
      }
    );
  }

  eliminar(persona: any): void {
    this.personaService.deletePersona(persona.idpersona).subscribe(
      (resp) => {
        console.log(resp);
        if (resp == true) {
          this.personas.pop(persona);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  editar(persona: any): void {
    this.personaForm.setValue({
      idpersona: persona.idpersona,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      pais: persona.pais,
      estado: persona.estado,
    });
  }
}
