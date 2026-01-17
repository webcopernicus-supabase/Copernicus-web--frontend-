import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const supabase = await createServerClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    return (
      <div className="p-10 text-white">
        Failed to load services
      </div>
    );
  }

  return (
    <section className="p-10">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services?.map((service) => (
          <div
            key={service.id}
            className="border border-white/10 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              {service.title}
            </h2>
            <p className="text-white/70">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
