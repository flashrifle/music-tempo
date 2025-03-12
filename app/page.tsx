import Header from '@/components/Header';
import MetronomeContainer from '@/components/MetronomeContainer';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <div>
      <Header />
      <SearchBar />
      <MetronomeContainer />
    </div>
  );
}
