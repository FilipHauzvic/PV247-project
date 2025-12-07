"use client";

import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { authClient } from "@/src/lib/auth-client";

type QuizListHeaderProps = {
    sortedByMine: boolean | null;
    setSortedByMine: (currSortedByMine: boolean) => void;
    setSearchText: (currSearchText: string) => void;
}

const QuizListHeader = (props: QuizListHeaderProps) => {
    const session = authClient.useSession();
    const router = useRouter();

    return (
        <nav className="w-full h-1/10 flex md:flex-row align-middle justify-between flex-col">
            <h2 className='justify-start text-4xl md:text-5xl font-semibold flex flex-row mt-4 ml-4 md:mt-4 md:ml-3 md:mr-2 lg:ml-25 2xl:ml-40'>Quizzes</h2>
            <ul className='justify-between flex flex-row ml-3'>
                {session.data !== null && session.data.user !== null ? (
                <>
                    <li className='mr-2 lg:mr-4 lg:mt-6 2xl:mr-10 mt-7'>
                    <Button size='large' variant={props.sortedByMine ? 'outlined' : 'contained'} color='success' onClick={() => props.setSortedByMine(false)}>Show all</Button>
                    </li>
                    <li className='mr-2 lg:mr-4 lg:mt-6 2xl:mr-10 mt-7'>
                        <Button size='large' variant={props.sortedByMine ? 'contained' : 'outlined'} color='success' onClick={() => props.setSortedByMine(true)}>Show mine</Button>
                    </li>
                </>
                ) : null}
                <li className='justify-start flex flex-row mt-5 mr-3 md:mr-0 md:mt-4'>
                    <div className='mt-4 ml-1 mr-2 md:ml-3'>
                        <SearchIcon sx={{ display: { xs: 'flex' }, fontSize: 28, color: 'black' }} fontSize='large' />
                    </div>
                    <TextField
                        id="filled-search"
                        label="Search quizzes"
                        type="search"
                        variant="filled"
                        fullWidth={true}
                        onChange={(e) => props.setSearchText(e.target.value)}
                    />
                </li>
            </ul>
            <div className='justify-end mt-4 md:mr-3 ml-3 md:ml-0 lg:mr-25 2xl:mr-40'>
                <IconButton onClick={() => router.push("/create")} sx={{ p: 0 }}>
                    <AddCircleIcon sx={{ display: { xs: 'flex' }, fontSize: 50, color: 'green' }}/>
                </IconButton>
            </div>
        </nav>
    );
};

export default QuizListHeader;
