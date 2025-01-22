////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  fruit?: string;
  color?: string;
  avatar?: string;
  twitter?: string;
  shape?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "color"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["fruit", "color"],
    });
  }
  return contacts.sort(sortBy("color", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://img.freepik.com/psd-gratis/cerca-manzana-aislada_23-2151598148.jpg",
    fruit: "Manzana",
    color: "Roja",
  
  },
  {
    avatar:
      "https://media.istockphoto.com/id/595754692/es/foto/mango-verde-fresco-sobre-fondo-blanco.jpg?b=1&s=612x612&w=0&k=20&c=SrAGzVrQblFcFEK7Fkyn5VjmAP3beF92pV9mdrzu3XY=",
    fruit: "Mango",
    color: "Verde",
    
  },
  {
    avatar:
      "https://img.freepik.com/foto-gratis/mandarina-aislado-sobre-fondo-blanco_93675-131661.jpg",
    fruit: "Mandarina",
    color: "Naranja",
  },
  {
    avatar:
      "https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?cs=srgb&dl=pexels-qjpioneer-708777.jpg&fm=jpg",
    fruit: "Uva",
    color: "Morada",
    shape: "Redonda"
  },
  {
    avatar:
      "https://cdn.pixabay.com/photo/2015/08/10/12/02/avocados-882635_1280.jpg",
    fruit: "Aguacate",
    color: "Verde",
  },
  {
    avatar:
      "https://media.istockphoto.com/id/173242750/es/foto/racimo-de-pl%C3%A1tanos.jpg?s=612x612&w=0&k=20&c=-RqILbvnZIp5YZRm3BGc-i5n_e2VsJCUu9GU9OqVAbk=",
    fruit: "Banano",
    color: "Amarillo",
    
    
  },
  {
    avatar:
      "https://media.istockphoto.com/id/861290990/es/foto/lima-aislado-en-blanco.jpg?s=612x612&w=0&k=20&c=bRX6yN15OKIM4Ns5C0wlDtwg6g8t2vRY-zb6ccAuX2M=",
    fruit: "Limon",
    color: "verde",
    shape: "Redonda",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuYW5hc3xlbnwwfHwwfHx8MA%3D%3D",
    fruit: "Piña",
    color: "Marron Dorado",
    shape: "Alargada",
  },
  {
    avatar:
      "https://media.istockphoto.com/id/1313307173/es/foto/montones-de-fresas-rojas-frescas-recogidas-aisladas-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=g04y-jh5oB709XpSKEPVk6NgAM1gKjd8fdVz6-CVpBA=",
    fruit: "Fresa",
    color: "Rojo Brillante",
    shape: "pequeña conica",
  },
  {
    avatar:
      "https://media.istockphoto.com/id/1137630158/es/foto/fruto-%C3%BAnico-de-melocot%C3%B3n-con-hoja-aislada-en-blanco.jpg?s=612x612&w=0&k=20&c=QN4nZAGQfHb2WVQgczYV2pt6o6bcB7mRepoBCcmCJ9U=",
    fruit: "Durazno",
    color: "Naranja o Amarillo",
    
  },
 
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.fruit.toLowerCase()}-${contact.color.toLocaleLowerCase()}`,
  });
});
