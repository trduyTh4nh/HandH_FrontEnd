type ContactProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  url: string;
};
export default function Contacts(props: ContactProps) {
  return (
    <a href={props.url} className="flex gap-2 items-center max-w-80 no-underline">
      {props.icon}
      <div>
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <p>{props.subtitle}</p>
      </div>
    </a>
  );
}
