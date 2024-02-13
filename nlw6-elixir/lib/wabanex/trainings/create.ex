defmodule Wabanex.Trainings.Create do
  def call(params) do
    params
    |> Wabanex.Training.changeset()
    |> Wabanex.Repo.insert()
  end
end
