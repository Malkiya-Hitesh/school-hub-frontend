export default function Section({
  children,
  className = "",
}) {
  return (
    <section
      className={` w-full py-10 xs:py-12 sm:py-14 md:py-16  lg:py-2  xl:py-24 px-3  xs:px-4  sm:px-6   md:px-8  lg:px-10 xl:px-12 ${className}`}
    >
      <div
        className=" mx-auto w-full max-w-7xl "
      >
        {children}
      </div>
    </section>
  );
}