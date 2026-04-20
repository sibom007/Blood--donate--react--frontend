export const Footer = () => {
  return (
    <footer className="border-t border-border pt-10 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        <div className="md:col-span-5">
          <h3 className="text-3xl font-extrabold text-primary flex items-center gap-3 tracking-tighter">
            <img src="/logo.svg" alt="" /> RedLink
          </h3>
          <p className="text-muted-foreground mt-5 max-w-md text-lg leading-relaxed">
            Empowering communities through the gift of life. We make blood
            donation accessible, fast, and secure for everyone, everywhere.
          </p>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-4 text-muted-foreground font-medium text-base">
              {["Find Donor", "Become Donor", "Blood Camps", "Safety"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-primary hover:underline transition-colors">
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="sm:col-span-2">
            <h4 className="font-bold text-lg mb-6 text-foreground">
              Contact & Support
            </h4>
            <div className="space-y-4 text-muted-foreground font-medium text-base">
              <p className="flex items-center gap-3">
                <span className="text-primary font-bold">Email:</span>{" "}
                support@redlink.org
              </p>
              <p className="flex items-center gap-3">
                <span className="text-primary font-bold">Phone:</span> +880
                123456789
              </p>
              <div className="flex gap-4 mt-8 pt-4 border-t border-border/50">
                {/* Modern Social Icons Placeholders */}
                {["FB", "TW", "IG", "LI"].map((soc) => (
                  <a
                    key={soc}
                    href="#"
                    className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all font-bold border border-border hover:border-primary/20 hover:-translate-y-1 hover:shadow-md">
                    {soc}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="max-w-7xl mx-auto px-6 border-t border-border/70 mt-5 py-3 flex flex-col sm:flex-row justify-between items-center text-muted-foreground text-sm font-medium">
        <p>© 2026 RedLink Initiative. All rights reserved.</p>
        <div className="flex gap-8 mt-5 sm:mt-0">
          <a
            href="#"
            className="hover:text-primary hover:underline transition-colors">
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-primary hover:underline transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
