defmodule Wabanex.Repo.Migrations.CreateExercisesTable do
  use Ecto.Migration

  def change do
    create table(:exercises) do
      add :training_id, references(:trainings)
      add :name, :string
      add :protocol, :string
      add :repetitions, :string
      add :video_url, :string

      timestamps()
    end
  end
end
