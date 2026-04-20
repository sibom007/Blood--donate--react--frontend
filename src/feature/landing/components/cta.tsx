import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const Cta = () => {
  return (
    <section className="py-24 bg-primary text-primary-foreground text-center">
      <h2 className="text-4xl font-bold">Become a Lifesaver Today</h2>

      <p className="mt-4 opacity-90">Register now and help people in need.</p>
      <Link to={"/sign-up"}>
        <Button variant={"secondary"} size={"lg"} className="mt-4">
          Register Now
        </Button>
      </Link>
    </section>
  );
};
