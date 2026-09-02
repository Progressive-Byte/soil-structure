import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-heading text-6xl font-bold text-lime-600">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink">
        This page isn&rsquo;t here.
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you were looking for may have moved or never existed. Let&rsquo;s get you back on
        solid ground.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/" variant="dark">
          Back to home
        </Button>
        <Button href="/projects" variant="outline">
          View projects
        </Button>
      </div>
    </Container>
  );
}
