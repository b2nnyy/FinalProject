export default function Footer() {
  return (
    <footer className="mt-24 md:mt-32">
      <div className="mx-auto max-w-page px-6 sm:px-8">
        <hr className="decorative-rule-center mb-8" />
        <div className="pb-10 text-center">
          <p className="text-[0.8125rem] font-sans tracking-wide text-muted">
            Ben Inglee &mdash; Travel Writing Portfolio
          </p>
          <p className="text-xs text-muted-light mt-2 tracking-wider">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
