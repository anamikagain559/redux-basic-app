import { Button } from "@/components/ui/button" ;

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
     <h1> Counter with Redux</h1>
     <Button>Increment</Button>
     <div>0</div>
     <Button>Decrement</Button>
    </div>
  )
}

export default App