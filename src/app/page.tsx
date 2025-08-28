import SignIn from './(auth)/signin/page';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
