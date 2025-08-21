import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "saved_movies";

export const getSavedMovies = async (): Promise<string[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    return [];
  }
};

export const saveMovie = async (movieId : string) => {
  try {
    const currentMovies = await getSavedMovies();
    const updatedMovies = [...currentMovies, movieId];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMovies));
  } catch (error) {
    console.error("Error saving movie:", error);
  }
};

export const unsaveMovie = async (movieId: string) => {
  try {
    const currentMovies = await getSavedMovies();
    const updatedMovies = currentMovies.filter((id) => id !== movieId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMovies));
  } catch (error) {
    console.error("Error removing movie:", error);
  }
};

export const isMovieSaved = async (movieId: string): Promise<boolean> => {
  const savedMovies = await getSavedMovies();
  return savedMovies.includes(movieId);
};
