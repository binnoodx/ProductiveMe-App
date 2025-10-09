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
import { saveTodo, getTodo, deleteTodo, clearAllTodos } from "@/helper/todoLocalStorage";
import Checkbox from "expo-checkbox";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const Todo = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { todo: "" },
  });

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Load and clean todos from storage
  const loadTodos = async () => {
    const localTodo = await getTodo();

    // Filter invalid items & flatten nested arrays
    const cleaned: TodoItem[] = localTodo
      .flat()
      .filter((t: any) => t && typeof t === "object" && t.text)
      .map((t: any) => ({ id: t.id, text: t.text, completed: t.completed ?? false }));

    setTodos(cleaned);
    await saveTodo(cleaned);
  };

  // Add new todo
  const onSubmit = async (data: any) => {
    if (data.todo.trim()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        text: data.todo.trim(),
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      await saveTodo(updatedTodos);
      reset();
    }
  };

  // Delete a todo by id
  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    await loadTodos();
  };

  // Toggle completed
  const toggleCompleted = async (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    await saveTodo(updatedTodos);
  };

  return (
    <ScrollView className="h-screen bg-white">
      {/* Input Section */}
      <View className="flex flex-row w-screen mt-5 justify-center items-center gap-2 px-3">
        <Controller
          control={control}
          name="todo"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Write your Todo for Today"
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

      {/* Todo List */}
      <FlatList
        data={todos}
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
      {todos.length === 0 && (
        <View className="h-[80vh] w-screen justify-center items-center flex-1">
          <Text className="text-xl font-semibold">No Todo Found ☹️</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Todo;
