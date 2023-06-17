// Basic C++ code for the Sudoku Solver

#include <bits/stdc++.h>
using namespace std;

bool isValid(int board[][9],int num,int r,int c)
{
    for(int col=0;col<9;col++)
        if(board[r][col]==num) 
            return false;

    for(int row=0;row<9;row++)
        if(board[row][c]==num) 
            return false;

    int box_start_r= (r/3)*3;
    int box_start_c= (c/3)*3;

    for(int row=box_start_r;row<box_start_r+3;row++)
        for(int col=box_start_c;col<box_start_c+3;col++)
            if(board[row][col]==num)
                return false;

    return true;
    
}

bool SudokuSolver(int board[][9])
{
    for(int row=0;row<9;row++)
    {
        for(int col=0;col<9;col++)
        {
            if(board[row][col]==0)
            {
                for(int num=1;num<=9;num++)
                {
                    if(isValid(board,num,row,col))
                    {
                        board[row][col]=num;

                        if(SudokuSolver(board))
                            return true;
                        else 
                            board[row][col]=0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

int main()
{
    int board[9][9];

    cout<<"Enter the Board : \n";
    for(int i=0;i<9;i++)
    {
        for(int j=0;j<9;j++)
        {
            cin>>board[i][j];
        }
    }   

    SudokuSolver(board);

        for(int i=0;i<9;i++)
    {
        for(int j=0;j<9;j++)
        {
            cout<<board[i][j]<<" ";
        }
        cout<<endl;
    }

}