import type { ActionFunctionArgs,LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getContact, updateContact } from "../data";

export const loader = async ({params,}: LoaderFunctionArgs) => {

    invariant(params.contactId, "Missing contactId param");
    const contact = await getContact(params.contactId);
    if (!contact) {
      throw new Response("Not Found", { status: 404 });
    }
    return json({ contact });
  };

export const action = async ({params,request, }: ActionFunctionArgs) => {

    invariant(params.contactId, "Missing contactId param");
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}` , {status: 301});
  };


export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();

  return (
    <Form key={contact.id} id="contact-form" method="post">
      <p>
        <span>Fruit</span>
        <input
          aria-label="Fruit"
          defaultValue={contact.fruit}
          name="fruit"
          placeholder="Fruit"
          type="text"
        />
        <input
          aria-label="Color"
          defaultValue={contact.color}
          name="color"
          placeholder="Color"
          type="text"
        />
      </p>
      <label>
        <span>Shape</span>
        <input
          defaultValue={contact.shape}
          name="shape"
          placeholder="Forma"
          type="text"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          defaultValue={contact.notes}
          name="notes"
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <Link to="/">
        <button type="button">Cancel</button>
</Link>
      </p>
    </Form>
  );
}
