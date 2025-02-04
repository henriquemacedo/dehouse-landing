import { headers } from "next/headers";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Benefits from "@/components/benefits";
import Locations from "@/components/locations";
import Events from "@/components/events";
import Partners from "@/components/partners";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";
import { getClient } from "@/lib/client";
import {
  FEATURED_EVENTS_QUERY,
  CITIES_QUERY,
  LOCATIONS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/graphql/queries";

async function getData() {
  const featuredEvents = await getClient().query({
    query: FEATURED_EVENTS_QUERY,
    variables: {
      where: {
        featured: {
          equals: true,
        },
      },
      orderBy: [{ date: "asc" }],
    },
  });

  const cities = await getClient().query({
    query: CITIES_QUERY,
  });

  const locations = await getClient().query({
    query: LOCATIONS_QUERY,
    variables: {
      where: {
        featured: {
          equals: true,
        },
      },
      orderBy: [{ date: "asc" }],
    },
  });

  const testimonials = await getClient().query({
    query: TESTIMONIALS_QUERY,
    variables: {
      where: {
        featured: {
          equals: true,
        },
      },
      orderBy: [{ createdAt: "asc" }],
    },
  });

  return {
    events: featuredEvents.data.events,
    cities: cities.data.locations,
    locations: locations.data.locations,
    testimonials: testimonials.data.testimonials,
  };
}

export default async function Home() {
  const headersList = headers();
  const data = await getData();
  const referer = headersList.get("referer");

  return (
    <main>
      <Nav />
      <Hero cities={data.cities} />
      <Services />
      <Benefits />
      <Locations locations={data.locations} />
      <Events events={data.events} />
      <Partners />
      <Testimonials testimonials={data.testimonials} />
      <Footer />
    </main>
  );
}
