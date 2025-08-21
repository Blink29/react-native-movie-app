import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { getSavedMovies } from "@/utils/saveMovie";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Save = () => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
      useCallback(() => {
        const loadSavedMovies = async () => {
          setLoading(true);
          const ids = await getSavedMovies();
          const movies: Movie[] = [];
          for (const id of ids) {
            try {
              const movie = await fetchMovieDetails(id);
              movies.push(movie);
            } catch (error) {
              console.error("Error fetching movie details:", error);
            }
          }
    
          setSavedMovies(movies);
          setLoading(false);
        };
    
        loadSavedMovies();
      }, [])
  );

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-10">
        <View className="flex justify-center items-center flex-1">
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }
  
  if (savedMovies.length === 0) {
    return (
      <SafeAreaView className="bg-primary flex-1 px-10">
        <View className="flex justify-center items-center flex-1 flex-col gap-5">
          <Image source={icons.save} className="size-10" tintColor="#fff" />
          <Text className="text-gray-500 text-base">No saved movies yet.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1 px-4">
      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => <MovieCard {...item} />}
        contentContainerStyle={{ paddingVertical: 16 }}
      />  
    </SafeAreaView>
  );
};

export default Save;
