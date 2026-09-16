export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-5xl">
        <div className="pointer-events-none absolute -inset-1 rounded-full bg-primary-container/20 opacity-60 blur-xl" />

        <div className="relative grid gap-8 rounded-xl bg-surface-container-low p-6 shadow-2xl sm:p-8 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-10 lg:p-10">
          {/* Left side */}
          <section className="flex flex-col justify-between gap-10 lg:py-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-primary">
                  EnvVault
                </h1>

                <div className="rounded-sm border border-outline/50 px-2 py-0.5 text-sm text-on-surface-variant">
                  v1.0.0
                </div>
              </div>

              <p className="text-sm text-secondary">
                Securely store and manage your environment variables.
              </p>
              <p className="text-xs text-on-surface-variant/70">
                Built for developers who prefer simplicity.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-3xl font-semibold leading-tight text-on-surface">
                  Your secrets.
                  <br />
                  One quiet vault.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-on-surface-variant">
                  Keep your environment variables organized and protected,
                  without exposing sensitive configuration across your projects.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-sm text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Organize secrets by project.</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Keep sensitive values protected.</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Access your configuration from one place.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div
            className="hidden w-px bg-linear-to-b from-transparent via-outline/50 to-transparent lg:block"
            aria-hidden="true"
          />

          {/* Right side */}
          <section className="flex items-center">
            <div className="w-full">{children}</div>
          </section>
        </div>
      </div>
    </main>
  );
}