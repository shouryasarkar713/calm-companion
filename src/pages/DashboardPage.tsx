
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../components/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">Your Progress</h1>
      <Dashboard />
    </AppLayout>
  );
};

export default DashboardPage;
