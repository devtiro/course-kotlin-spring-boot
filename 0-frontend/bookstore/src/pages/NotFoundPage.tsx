import BasePage from "./BasePage";

export default function NotFoundPage() {
  return (
    <BasePage>
      <div className="h-max w-max m-auto">
        <div className="text-center m-auto">
          <h1 className="font-extrabold text-8xl mb-2 text-default-400">404</h1>
          <h2 className="font-extrabold text-4xl mb-8 text-default-400">
            Not Found
          </h2>
        </div>
      </div>
    </BasePage>
  );
}
