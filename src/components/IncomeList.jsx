import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";

export default function IncomeList() {
  const { entries , setEntries } = useEntries();
  const handleDelete = id =>{
    console.log("deleteid:",id);
    const remaining = entries.filter(cart=>cart.id!==id);
    setEntries(remaining);
  }
  const handleEdit = (id) => {
    const newValue = prompt("Enter the new value:");

    if (newValue !== null) {
      const editEntries = entries.map((entry) =>
        entry.id === id ? { ...entry, value: parseFloat(newValue) } : entry
      );

      setEntries(editEntries);
    }
  };
  const incomeEntries = entries.filter((entry) => entry.type === "income");

  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-green-600">Income</h2>
      {incomeEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="income-list" className="divide-y">
        {incomeEntries.map((income) => {
          return (
            <li key={income.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{income.title}</span>

                <div>
                  <span className="text-green-600">
                    {formatMoney(income.value)}
                  </span>
                  <span className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block">
                  
                  <button className="btn bg-red-600 rounded-md text-white p-1 mr-2" onClick={()=>handleDelete(income.id)}> Delete</button>
                  <button className="btn bg-blue-600 rounded-md text-white p-1"onClick={()=>handleEdit(income.id)}> Edit</button>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
