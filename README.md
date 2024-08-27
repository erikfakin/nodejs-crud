# API za upravljanje korisnicima
Implementacija jednostavne CRUD aplikacije za upravljanje korisnicima koristeći Node.js, db.json kao bazu podataka, i DevExtreme dxDataGrid komponentu

## Cilj
Kreiranje jednostavne CRUD (Create, Read, Update, Delete) aplikacije koja omogućava upravljanje korisnicima. Aplikacija koristi Node.js kao backend server, dok db.json file simulira bazu podataka. 
Na frontend strani koristimo DevExtreme dxDataGrid komponentu u kombinaciji sa jQuery-jem kako bi omogućili upravljanje podacima korisnika.

## Sadržaj

- [Značajke](#značajke)
- [Instalacija](#instalacija)
- [Pokretanje aplikacije](#pokretanje-aplikacije)
- [API](#api)
- [Frontend](#frontend)


## Značajke

- **Kreiranje**: Kreiranje novih korisnika.
- **Čitanje**: Čitanje svih korisnika.
- **Ažuriranje**: Ažuriranje podataka postojećih korisnika.
- **Brisanje**: Brisanje korisnika s određenim ID-om.
- **Frontend**: Frontend za upravljanje korisnicima.
- **Validacija**: Validacija podataka na frontendu i na backendu prilikom dodavanja i ažuriranja korisnika.
- **Sortiranje i filtriranje**: Sortiranje i filtriranje korisnika unutar dxDataGrid komponente.
- **Paginacija**: Paginacija u dxDataGrid komponenti.
- **Pretraga**: Pretraga korisnika prema imenu ili emailu.

## Instalacija

1. **Klonirajte repozitorij**

   ```bash
   git clone https://github.com/erikfakin/nodejs-crud.git
   cd nodejs-crud
   ```

2. **Instalirajte ovisnosti**
   ```bash
   npm install
   ```

## Pokretanje aplikacije

1. **Pokrenute server**
    ```bash
    npm start
    ```

2. **Posjetite frontend**
    Otvorite preglednik i idite na http://localhost:3000 za pristup frontendu.

## API

API rute

- **GET /users** - Ova ruta vraća sve korisnike.
- **POST /users** - Ova ruta omogućava dodavanje novog korisnika.
- **PUT /users/:id** - Ova ruta omogućava ažuriranje podataka postojećeg korisnika s određenim ID-jem.
- **DELETE /api/users/:id** - Ova ruta briše korisnika s određenim ID-jem.

### Primjer tijela requesta (JSON)
```json
{
"ime": "Marija",
"prezime": "Horvat",
"email": "marija.horvat@example.com",
"brojTelefona": "+385 (0)91 234 5678"
}
```

## Frontend

Frontend koristi HTML i jQuery dxDataGrid komponentu. Omogućuje sljedeće:

- **Prikaz korisnika:** Podaci korisnika trebaju biti prikazani u gridu.
- **Dodavanje korisnika:** Korisnik može dodati novog korisnika putem forme u dxDataGrid komponenti.
- **Uređivanje korisnika:** Korisnik može uređivati postojeće korisnike direktno u gridu.
- **Brisanje korisnika:** Korisnik može obrisati postojećeg korisnika direktno iz grida.
