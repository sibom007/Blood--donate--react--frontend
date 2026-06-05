

function AllRequestPage() {
  return (
    <div>
      <header className="mb-8 space-y-2 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            My Blood Requests
          </h1>
          <p className="text-muted-foreground text-lg sm:text-sm">
            Manage and track your active blood donation requests, monitor status{" "}
            <br />
            updates, and filter through your history.
          </p>
        </div>
      </header>
    </div>
  );
}

export default AllRequestPage;
