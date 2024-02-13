defmodule WabanexWeb.Resolvers.Training do
  def create(%{input: params}, _context) do
    params
    |> Wabanex.Trainings.Create.call()
  end
end
