// import { createContext, useState } from "react";
// import type { AuthContextType, SupaSession } from "./types.ts";

// const AuthContext = createContext<AuthContextType | null>(null);
// export const AuthContextProvide = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [session, setSession] = useState<SupaSession>(null);
//   return (
//     <AuthContext.Provider value={{ session, setSession }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
