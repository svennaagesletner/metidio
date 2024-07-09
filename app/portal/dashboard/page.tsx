import DashboardMain from "@/components/dashboard/dashboard-main";
import { dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import { getDashboardData } from "@/lib/actions/getDashboardData";

const page = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['dashboard'],
    queryFn: () => getDashboardData(),
  })


  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
          <DashboardMain />
      </HydrationBoundary>
    </main>
  );
}

export default page;