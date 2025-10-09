import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  FlatList 
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { getGoals , saveGoal , deleteGoals } from "@/helper/goalsLocalStorage";
import Checkbox from "expo-checkbox";

interface GoalItem {
  id: number;
  text: string;
  completed: boolean;
}

const Goals = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { Goal: "" },
  });

  const [Goals, setGoals] = useState<GoalItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load Goals on mount
  useEffect(() => {
    loadGoals();
  }, []);

  // Load and clean Goals from storage
  const loadGoals = async () => {
    const localGoal = await getGoals();

    // Filter invalid items & flatten nested arrays
    const cleaned: GoalItem[] = localGoal
      .flat()
      .filter((t: any) => t && typeof t === "object" && t.text)
      .map((t: any) => ({ id: t.id, text: t.text, completed: t.completed ?? false }));

    setGoals(cleaned);
    await saveGoal(cleaned);
  };

  // Add new Goals
  const onSubmit = async (data: any) => {
    if (data.Goal.trim()) {
      const newGoal: GoalItem = {
        id: Date.now(),
        text: data.Goal.trim(),
        completed: false,
      };
      const updatedGoals = [...Goals, newGoal];
      setGoals(updatedGoals);
      await saveGoal(updatedGoals);
      reset();
    }
  };

  // Delete Goals by id
  const handleDelete = async (id: number) => {
    await deleteGoals(id);
    await loadGoals();
  };

  // Toggle completed
  const toggleCompleted = async (id: number) => {
    const updatedGoals = Goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
    await saveGoal(updatedGoals);
  };

  return (
    <ScrollView className="h-screen bg-white">
      {/* Input Section */}
      <View className="flex flex-row w-screen mt-5 justify-center items-center gap-2 px-3">
        <Controller
          control={control}
          name="Goal"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={`Write Your Goal for ${new Date().toLocaleString('default', { month: 'long' , year:'numeric'  })}`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="border border-slate-400 px-4 w-[70vw] bg-slate-50 text-black py-4 rounded-lg"
              placeholderTextColor="#94a3b8"
            />
          )}
        />

        {loading ? (
          <TouchableOpacity
            disabled
            className="bg-orange-400 w-[20vw] rounded-lg py-4 flex items-center justify-center"
          >
            <ActivityIndicator size="small" color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-orange-400 w-[20vw] rounded-lg py-4 flex items-center justify-center"
          >
            <Text className="text-white text-lg font-semibold">Add</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Goals List */}
      <FlatList
        data={Goals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mt-6 mx-6 flex-row justify-between items-center border-b border-slate-200 pb-3">
            <Checkbox
              className="scale-90"
              value={item.completed}
              onValueChange={() => toggleCompleted(item.id)}
              color={item.completed ? "tomato" : undefined}
            />

            <Text
              className={`text-lg flex-1 ml-3 ${item.completed ? "line-through text-gray-400" : "text-black"}`}
            >
              {item.text}
            </Text>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text className="text-red-500 font-semibold">Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      

      {/* Empty State */}
      {Goals.length === 0 && (
        <View className="h-[80vh] w-screen justify-center items-center flex-1">
          <Text className="text-xl font-semibold">No Goals Found ☹️</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Goals;
