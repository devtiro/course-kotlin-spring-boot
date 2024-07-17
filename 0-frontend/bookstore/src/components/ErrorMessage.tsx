import { AlertTriangle } from "react-feather";

type ErrorMessageProps = {
  message: string;
};
export default function ErrorMessage(props: ErrorMessageProps) {
  const { message } = props;
  return (
    <div className="p-8 text-center">
      <AlertTriangle className="mx-auto mb-4 text-default-500" size={40} />
      <h2 className="text-xl font-bold text-default-500">{message}</h2>
    </div>
  );
}
