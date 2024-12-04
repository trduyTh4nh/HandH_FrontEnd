type ContactProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  url: string;
};
export default function Contacts(props: ContactProps) {
  return (
    <a target="_blank" href={props.url} className="flex flex-col md:flex-row gap-2 items-center max-w-80 no-underline">
      {props.icon}
      <div>
        <h3 className="text-xl text-center md:text-left font-semibold">{props.title}</h3>
        <p className="text-center md:text-left">{props.subtitle}</p>
      </div>
    </a>
  );
}
