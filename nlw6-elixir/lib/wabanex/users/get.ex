defmodule Wabanex.Users.Get do
  import Ecto.Query

  def call(id) do
    id
    |> Ecto.UUID.cast()
    |> handle_response()
  end

  defp handle_response({:ok, uuid}) do
    case Wabanex.Repo.get(Wabanex.User, uuid) do
      nil -> {:error, "User not found"}
      user -> {:ok, load_training(user)}
    end
  end

  defp handle_response(:error) do
    {:error, "Invalid UUID"}
  end

  defp load_training(user) do
    today = Date.utc_today()

    query =
      from training in Wabanex.Training,
        where: ^today >= training.start_date and ^today <= training.end_date

    Wabanex.Repo.preload(user, trainings: {first(query, :inserted_at), :exercises})
  end
end
