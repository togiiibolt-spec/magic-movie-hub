-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  is_main BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, name)
);

-- Create user watch history table
CREATE TABLE public.watch_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content_id TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('movie', 'series', 'music')),
  episode_id TEXT,
  season_number INTEGER,
  episode_number INTEGER,
  progress_seconds INTEGER DEFAULT 0,
  total_duration_seconds INTEGER,
  last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create music library table
CREATE TABLE public.music (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT,
  duration_seconds INTEGER,
  audio_url TEXT,
  cover_image TEXT,
  genre TEXT,
  year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profiles" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profiles" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profiles" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for watch history
CREATE POLICY "Users can view their profiles' watch history" 
ON public.watch_history 
FOR SELECT 
USING (
  profile_id IN (
    SELECT id FROM public.profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can create watch history for their profiles" 
ON public.watch_history 
FOR INSERT 
WITH CHECK (
  profile_id IN (
    SELECT id FROM public.profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their profiles' watch history" 
ON public.watch_history 
FOR UPDATE 
USING (
  profile_id IN (
    SELECT id FROM public.profiles WHERE user_id = auth.uid()
  )
);

-- RLS Policies for music (public read access)
CREATE POLICY "Music is viewable by everyone" 
ON public.music 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for profiles timestamps
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for watch history
ALTER TABLE public.watch_history REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.watch_history;

-- Insert sample music data
INSERT INTO public.music (title, artist, album, duration_seconds, audio_url, cover_image, genre, year) VALUES
('Blinding Lights', 'The Weeknd', 'After Hours', 200, '/sample-music/blinding-lights.mp3', '/sample-covers/blinding-lights.jpg', 'Pop', 2020),
('Watermelon Sugar', 'Harry Styles', 'Fine Line', 174, '/sample-music/watermelon-sugar.mp3', '/sample-covers/watermelon-sugar.jpg', 'Pop', 2020),
('Good 4 U', 'Olivia Rodrigo', 'SOUR', 178, '/sample-music/good-4-u.mp3', '/sample-covers/good-4-u.jpg', 'Pop Rock', 2021),
('Stay', 'The Kid LAROI & Justin Bieber', 'F*CK LOVE 3: OVER YOU', 141, '/sample-music/stay.mp3', '/sample-covers/stay.jpg', 'Pop', 2021),
('Levitating', 'Dua Lipa', 'Future Nostalgia', 203, '/sample-music/levitating.mp3', '/sample-covers/levitating.jpg', 'Pop', 2020);