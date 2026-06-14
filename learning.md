The correct mental model (very important)

Think of NestJS like this:

Decorator (@Roles)
↓
Metadata storage (hidden layer)
↓
Reflector = tool to READ metadata
↓
Guards / Controllers / Interceptors decide if they care

########################### HOW REFLECTOR WORKS ###############################

When you write:

this.reflector.getAllAndOverride(ROLES_KEY, [
context.getHandler(),
context.getClass(),
]);

NOTE: Inside a guard, Nest gives you:

ExecutionContext

From it:

context.getHandler() // current route method
context.getClass() // current controller class

getClass() and getHandler() do not read or extract anything by themselves.

🔥 What they actually are

They only return references (targets).

context.getClass()

👉 returns the controller class reference

context.getHandler()

👉 returns the route handler method reference

🧠 Then who extracts metadata?

👉 Reflector does the actual extraction:

this.reflector.getAllAndOverride(ROLES_KEY, [
context.getHandler(),
context.getClass(),
]);

So flow is:

getClass/getHandler → give targets
Reflector → reads metadata from those targets
🔥 Think of it like this
getClass() / getHandler()

👉 “Where should I look?”

Reflector

👉 “Let me go there and read the data”

🧠 Example in your code
@Controller('students')
@Roles(Role.Student)
export class StudentsController {

@Get()
@Roles(Role.Admin)
getAllStudents() {}
}

Now:

context.getClass()

→ points to StudentsController

context.getHandler()

→ points to getAllStudents

Reflector does:
check metadata on handler.
check metadata on class.
combine / override → final decision

############################### CUSTOM DECORATOR ###############################
@Roles(Role.Student):

1. order not matter for it
2. Roles is a Decorator and decorators don’t “send data to guards”.
3. They “attach metadata to the route”, and whoever in that route wants can read it using Reflector.

################ How does Nest know to run your Roles decorator ################

When you write:

@Roles(Role.Student)

You are literally calling a function:

Roles(Role.Student)

So Nest is NOT searching files.

👉 YOU imported and used it.

🔥 Example flow
Your file (roles.decorator.ts):
export const Roles = (...roles: Role[]) =>
SetMetadata(ROLES_KEY, roles);

Controller:
import { Roles } from './roles.decorator';

@Roles(Role.Student)

👉 Because you imported it, TypeScript/Nest executes it.

What does ...roles mean?

This is JavaScript called rest parameter

(...roles: Role[])
🧠 Meaning:

“Take all arguments that are passed to Roles() and put them into an array”

🔥 Example
You write:
@Roles(Role.Student)
It becomes:
Roles(Role.Student)
Inside function:
roles = [Role.Student]

since Role is an enum which is imported in decorator file from role.enums.ts
roles becomes ["student"]

🧠 Simple mental model
@Roles(A, B, C)
↓
Roles(...args)
↓
roles = [A, B, C]
↓
SetMetadata('roles', roles)

What SetMetadata does

SetMetadata(ROLES_KEY, roles)

since Roles_Key=roles in roles.decorator.ts and roles=["student"] bcz we got Roles.Student from controller which maps to "student" and rest parameter put it inside array.

Therefore, set metadata attaches:

roles (coming from Key_Roles) : ["student"] (coming from enum and rest parameter)

META DATA LOOKS LIKE THIS AFTER SETTING:

metadata = {
roles: ['student']
}

**_ SetMetadata() attaches extra hidden data (metadata) to the controller or handler alongside the decorator, not replacing it _**.

🧠 Think of it like this
Before:

getAllStudents() function

After SetMetadata:

getAllStudents() function

- hidden metadata attached

       OR

CONTROLLER

After SetMetadata:

CONTROLLER (IF DECORATOR WAS DEFINED AT CONTROLLER LEVEL)

- hidden metadata attached

######################### HOW EVERYTHING CONNECTS ###########################

Step 1: Decorator runs (startup time)
@Roles(Role.Student)
SetMetadata('roles', ['student'])

✔ Stored on:

handler OR controller
Step 2: Request comes in (runtime)
GET /students

Nest creates:

ExecutionContext
Step 3: Guard runs
canActivate(context)

Nest passes:

context.getHandler()
context.getClass()
Step 4: Reflector reads metadata
this.reflector.getAllAndOverride(...)

✔ Looks at:

handler (method)
class (controller)

✔ Finds metadata from SetMetadata

🧠 4. FULL FLOW (VERY IMPORTANT)
@Roles() → SetMetadata stores roles
↓
Nest builds route map
↓
Request comes in
↓
ExecutionContext created
↓
Guard receives context
↓
context.getHandler()
context.getClass()
↓
Reflector reads metadata
↓
RoleGuard allows or blocks

💡 One-line clarity

SetMetadata stores data during route setup, while ExecutionContext (with getHandler() and getClass()) is created at request time so guards can locate where that metadata was stored.

############################### SYNTAX EXPLANATION ###########################
const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
context.getHandler(),
context.getClass(),
]);

1. getAllAndOverride reads metadata stored under ROLES_KEY
2. from both the route handler and the controller class.
3. It uses context.getHandler() and context.getClass() to locate where metadata might exist.
4. Since @Roles decorator stores an array (because we passed ...roles),the returned value will also be of type Role[].
5. Method-level roles override controller-level roles if both exist.
6. The result is assigned to requiredRoles, which is then used by RoleGuard.
