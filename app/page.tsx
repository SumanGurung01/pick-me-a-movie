import Banner from "@/components/Banner";
import MovieScroller from "@/components/MovieScroller";
import Result from "@/components/Result";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[1200px]">
        <Banner />
        <Result />
        <MovieScroller catagory={"Now Playing"} />
        <MovieScroller catagory={"Top Rated"} />
        <MovieScroller catagory={"Action"} />
        <MovieScroller catagory={"Romance"} />
        <MovieScroller catagory={"Comedy"} />
        <MovieScroller catagory={"Animation"} />
        <MovieScroller catagory={"Horror"} />
      </div>
    </div>
  );
}
