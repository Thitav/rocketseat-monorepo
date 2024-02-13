defmodule WabanexWeb.Resolvers.User do
  def get(%{id: user_id}, _context) do
    user_id
    |> Wabanex.Users.Get.call()
  end

  def create(%{input: params}, _context) do
    params
    |> Wabanex.Users.Create.call()
  end
end
