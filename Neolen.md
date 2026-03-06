

# 📖 NeolenBook

Welcome to the official user guide for the **Neolen programming language**. This guide will walk you through Neolen's unique syntax, program structure, and features, using complete examples from the enclosed files.

Neolen is designed with a primary goal: to make code flow from left to right, much like natural writing. This is achieved through a few core syntactical changes that streamline the development process.

-----

## 1\. The Basics: Syntax & Variables

First, let's cover the fundamental building blocks of the Neolen language.

### Key Concepts

  * **New Assignment Operator:** The most significant change is the assignment operator. Instead of `variable = value`, Neolen uses `variable : value`. This allows for a natural left-to-right flow. For example: `a : a + b`.
  * **Tagged Keywords:** Control flow and structural keywords are enclosed in curly braces, much like a markup language. Examples include `<while>`...`</while>` , `<fun>`...`</fun>` , and `<if>`...`</if>`This makes it easy to find mistakes and introduce new keywords.
  * **Comments:** Single-line comments begin with `//`.

### Data Types & Operators

Neolen supports standard data types:

  *  `int`: integer  
  *  `float`: float decimal  
  *  `char`: character  
  *  `string`: array of "char"  
  *  `bool`: boolean "true" or "false"  

 It also supports standard arithmetic operators: `+`, `-`, `*`, `/`, and `%` (mod) .

### Variable Declaration

You can declare a variable with or without an initial value.

  *  **Declaration only:** `int i`  
  *  **Declaration with initialization:** `int i(0)` (i becomes 0)   , `char c("a")`   , `bool l(true)`   , `string s("abcde")` .

-----

## 2\. Program Structure & Functions

Neolen programs are organized into modules and functions.

### Modules

 A program is defined within a `<module>` block.

```Neolen
<module> Euclidean 		// module itself
    ...
</module>
```

 

### Function Declaration

 Function declarations are also reversed to fit the left-to-right flow .

  *  **Syntax:** `<fun>  <return_type> <function_name>(<input_parameters>)`  
  *  **Example:** `<fun> int Euclid(int a, int b)`   (This declares a function named `Euclid` that takes two `int` parameters and returns an `int` ).
  *  **Calling a function:** `f(a, b)`  

### The `main` Function

 The entry point for your program is the `main` function.

  *  **Declaration:** `<fun>  int main(string args[])` 

### Example 1: `Euclidean` Program

 This full example demonstrates a simple module, function declaration, and Neolen's powerful I/O syntax.

```Neolen
<module> Euclidean 		// module itself

     <fun> int Euclid(int a, int b)  // function with type int
							
	<while> b!= 0
		<if> a > b
			a : a - b
		<else>
			b : b - a
		</else>
    	</if>
	</while>

	<return> a </return>

    </fun>

  
  <fun>	int main(string args[])	// main function

	int a, b

         //standard I/O

        // in -> a, b 
        // Euclid(a , b) -> out

        

       //short I/O

        Euclid(in -> a , b) -> out

    // combined input and output and function call
  // seamless input to output syntax

  </fun>

</module>
```

 
 Notice the line: ` Euclid(in -> a , b) -> out `. This single line seamlessly:

1.  Takes input (`in`)
2.  Assigns it to variables `a` and `b`
3.  Passes `a` and `b` to the `Euclid` function
4.  Takes the return value from `Euclid`
5.   Sends that result to output (`out`) 

-----

## 3\. Control Flow & Arrays

Neolen provides standard control flow mechanisms and array support.

### Conditional: `<if>` / `<else>`

 The `Euclidean` example shows a simple `<if>`/`<else>` block.

```Neolen
<if> a > b
    a : a - b
<else>
    b : b - a
</else>
</if>
```

 

### Loop: `<while>`

 The `Euclidean` example also uses a `<while>` loop.

```Neolen
<while> b!= 0
    ...
</while>
```

 

### Arrays

  *  **Declaration:** `int a[n]` (declares an integer array with `n` elements).
  *  **Initialization:** `int a[4]([1, 2, 3, 4])`.
  *  **Access:** `a[i]` (0-based indexing).

### Loop: `<for>`

 Neolen has a specific syntax for `<for>` loops .

  *  **Syntax:** `<for>int i(0)++ <n`  
  * **Explanation:**
      *  `int i(0)`: The iterator `i` is declared and initialized to 0 .
      *  `++`: The iteration step is by 1 .
      *  `< n`: The loop continues as long as `i` is less than `n` .

Here is an example of a `<for>` loop used to populate an array:

```Neolen
<for> int k(0)++ < n       // fill with true
    primes[k] : true
</for>
```

 

-----

## 4\. Advanced Example: Sieve of Eratosthenes

The following program, `primes`, uses arrays and loops to implement the Sieve of Eratosthenes algorithm.

```Neolen
<module> primes 

        <fun> int Eratosthenes(int n)       // subroutine declaration
             
            bool primes [ n ]        // variable declaration
            int l(0), i(0), index_square(3)         

            int first, last, factor 

            <for> int k(0)++ < n       // fill with true
                primes[k] : true
            </for>   
                
            <while> index_square < n         
                <if> primes[i]             

                    first : 0 + index_square
                    last : 0 + n   
                    factor : i + i + 3 
                    primes[first] : false   

                    <while> last - first > factor 
                        first : first + factor
                        primes[first] : false   
                    </while>
                    
                </if>  
                i : i + 1  
                 index_square : 2 * i * (i + 3) + 3
            </while>          

            ' 2'  :  out  // print out
            <for> i(0)++ < n         // print out
                <if> primes[i] 
                    <if> 2 * i + 3 > n 
                         break
                    </if>

                    ' ' 2 * i + 3  ->  out
                    l : l + 1 
 
                    <if> l % 10 == 0 
                        '\n'  ->  out
                    </if>   
          
                </if>        // if
            </for>         // print out

            '\n number : '  l  ->  out
        </fun>            // erato fun
     
        <fun>  int main  		// main function
 
        1000 : Eratosthenes       // subroutine call
        </fun>
</module>
```

 

 This example demonstrates array manipulation (e.g., `primes[first] : false`  ), nested loops (`<while>` inside `<while>`  ), and sending formatted output to the console (e.g., `'\n' -> out` ).

-----

## 5\. Object-Oriented Programming: Classes

Neolen also supports classes, allowing for object-oriented design.

  *  **Declaration:** `<class> ClassName ... </class>`.
  *  **Members:** You can define data members (e.g., `int a, int b`)   and member functions (e.g., `<fun> ... : Euclid`)  inside a class.
  *  **Object Creation:** `GCD N` creates an instance (object) `N` of the class `GCD`.
  *  **Access:** Members are accessed using the dot operator (e.g., `N.a`, `N.Euclid`).

### Example 3: `GCD` Class

 Here is the `Euclidean` algorithm refactored into a class.

```Neolen
<module> Euclidean

    <class> GCD    //class declaration

        int a, int b    //data members

        <fun> int Euclid(int a, int b)     //member function

            <while> b!=0
               <if> a > b
                   a : a - b
                <else>
                   b : b - a
                </else>
                </if>
            </while>

            <return> a </return>
        </fun>
    </class>


    <fun> int main(string args[])   //main function

        GCD N    //object N of class GCD

         N.Euclid(in -> N.a, N.b) -> out    
         
         //input, output in one line

    </fun>

</module>
```

 

 Once again, the `main` function showcases Neolen's natural flow.  The line `N.Euclid(in -> N.a, N.b) -> out` reads input directly into the object's data members (`N.a`, `N.b`), calls the object's member function (`N.Euclid`), and prints the returned result.

-----
## 6\.Intermodular

Neolen modules are connected through Intermodulars.

### Intermodular

Every module can be connected to other modules through intermodulars. Intermodular goes before module itself

### Example: Intermodular and Module

This example demonstrates flexibility and interconnection of module using mentioned before `Euclidian` algorithm

```Neolen

<intermodular>

   <link> in2out.neo </link>  //using standard input and output
   <link> module2.neo </link>  //connecting to another module

    <fun> int Euclid(int a, int b) </fun>  //function that can be used by another modules

</intermodular>

<module> Euclidean

    <fun> int Euclid(int a, int b)

    ...

    </fun>

    ...

</module>

```

In the beginning intermodular gives module access to standard I/O and then access to functions of another module. Also declaration of function that can be used by another module. Notice that source code extension of Neolen modules is `.neo`


-----

## 7\.File System

### File Declaration

`file f(name, type, options)` - file declaration and creating

* name includes path
* type can be: bin, txt, or hex
* options: r - read, w - write

### Example: writing and reading text file

```Neolen

file f("Readme.md", txt, wr+)  //creating text file
string s //srtring for reading and writing

f.open
<while> s  
//string for writing exists like reading "in : s" from standard input
    s -> f  //writing string to file
</while>
f.close

f.open
<while> not f.eof  //reading
    f -> s  //reading string from file
</while>
f.close

```
-----

## 8\.Integration with HTML

Neolen code can be used inside HTML because they have same syntax.

### Integration

Just put Neolen code inside `<Neolen> ... </Neolen>` block inside of HTML

### Example: Integration and HTML

This example demonstrates flexibility and interconnection of Neolen language with HTML

```Neolen

<html>   
     ...

<Neolen>

<module> Euclidean

    <fun> int Euclid(int a, int b)

    ...

    </fun>

    ...

</module>

</Neolen>
    ...

</html>

```

Neolen code can be either in header or body of webpage depending on usage


-----

## Origins

* **Neolen** language has its roots in **SGML** and  **HTML** markup languages and **C** and **Pascal** programming languages
* Tagged keywords `<while>` from **HTML**, variable declaration `int i` from **C**, and assignment operator `a : b (a := b)` from **Pascal**

