import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getListing from "../actions/getListing";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please, Login!" />
      </ClientOnly>
    );
  }

  const listings = await getListing({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    <ClientOnly>
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    </ClientOnly>;
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
