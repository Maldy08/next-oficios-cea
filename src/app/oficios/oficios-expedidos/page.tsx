// src/app/oficios/oficios-expedidos/page.tsx

import ClientSideComponent from "./components/ClientSideComponent";

interface Post {
  id: number;
  title: string;
  // Otros campos según tu API
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('http://localhost:3000/api/oficios');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default async function OficiosExpedidosPage() {
  let posts: Post[] = [];
  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">Oficios-Expedidos</h1>

      {/* Pasa los datos a un componente del cliente */}
      <ClientSideComponent posts={posts} />
    </div>
  );
}
