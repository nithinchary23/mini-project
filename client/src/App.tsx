import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Patients from "./pages/patients";
import Monitoring from "./pages/monitoring";
import MLModels from "./pages/ml-models";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import { useAuth } from "@/contexts/auth-context";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        {isAuthenticated ? (
          <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 ml-0 md:ml-64 transition-all">
              <Topbar />
              <main className="p-6">
                <Switch>
                  <Route path="/" component={Dashboard} />
                  <Route path="/patients" component={Patients} />
                  <Route path="/monitoring" component={Monitoring} />
                  <Route path="/ml-models" component={MLModels} />
                  <Route path="/reports" component={Reports} />
                  <Route path="/settings" component={Settings} />
                  <Route component={NotFound} />
                </Switch>
              </main>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
